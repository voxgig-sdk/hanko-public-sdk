<?php
declare(strict_types=1);

// HankoPublic SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class HankoPublicSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new HankoPublicUtility();
        $this->_utility = $utility;

        $config = HankoPublicConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = HankoPublicHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = HankoPublicHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!HankoPublicFeatures::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, HankoPublicFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return HankoPublicUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = HankoPublicHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = HankoPublicHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = HankoPublicHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new HankoPublicSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return is_string($allow_op) && str_contains($allow_op, $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new HankoPublicError($op . "_allow",
                "HankoPublicSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = HankoPublicHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = HankoPublicHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new HankoPublicError("graphql_error",
                "HankoPublicSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_create_user_response_object = null;

    // Canonical facade: $client->CreateUserResponseObject()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->create_user_response_object()
    // resolves here too.
    public function CreateUserResponseObject($data = null)
    {
        require_once __DIR__ . '/entity/create_user_response_object_entity.php';
        if ($data === null) {
            if ($this->_create_user_response_object === null) {
                $this->_create_user_response_object = new CreateUserResponseObjectEntity($this, null);
            }
            return $this->_create_user_response_object;
        }
        return new CreateUserResponseObjectEntity($this, $data);
    }


    private $_credential = null;

    // Canonical facade: $client->Credential()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->credential()
    // resolves here too.
    public function Credential($data = null)
    {
        require_once __DIR__ . '/entity/credential_entity.php';
        if ($data === null) {
            if ($this->_credential === null) {
                $this->_credential = new CredentialEntity($this, null);
            }
            return $this->_credential;
        }
        return new CredentialEntity($this, $data);
    }


    private $_credential_creation_option = null;

    // Canonical facade: $client->CredentialCreationOption()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->credential_creation_option()
    // resolves here too.
    public function CredentialCreationOption($data = null)
    {
        require_once __DIR__ . '/entity/credential_creation_option_entity.php';
        if ($data === null) {
            if ($this->_credential_creation_option === null) {
                $this->_credential_creation_option = new CredentialCreationOptionEntity($this, null);
            }
            return $this->_credential_creation_option;
        }
        return new CredentialCreationOptionEntity($this, $data);
    }


    private $_credential_request_option = null;

    // Canonical facade: $client->CredentialRequestOption()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->credential_request_option()
    // resolves here too.
    public function CredentialRequestOption($data = null)
    {
        require_once __DIR__ . '/entity/credential_request_option_entity.php';
        if ($data === null) {
            if ($this->_credential_request_option === null) {
                $this->_credential_request_option = new CredentialRequestOptionEntity($this, null);
            }
            return $this->_credential_request_option;
        }
        return new CredentialRequestOptionEntity($this, $data);
    }


    private $_email = null;

    // Canonical facade: $client->Email()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->email()
    // resolves here too.
    public function Email($data = null)
    {
        require_once __DIR__ . '/entity/email_entity.php';
        if ($data === null) {
            if ($this->_email === null) {
                $this->_email = new EmailEntity($this, null);
            }
            return $this->_email;
        }
        return new EmailEntity($this, $data);
    }


    private $_email_management = null;

    // Canonical facade: $client->EmailManagement()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->email_management()
    // resolves here too.
    public function EmailManagement($data = null)
    {
        require_once __DIR__ . '/entity/email_management_entity.php';
        if ($data === null) {
            if ($this->_email_management === null) {
                $this->_email_management = new EmailManagementEntity($this, null);
            }
            return $this->_email_management;
        }
        return new EmailManagementEntity($this, $data);
    }


    private $_hanko_configuration = null;

    // Canonical facade: $client->HankoConfiguration()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->hanko_configuration()
    // resolves here too.
    public function HankoConfiguration($data = null)
    {
        require_once __DIR__ . '/entity/hanko_configuration_entity.php';
        if ($data === null) {
            if ($this->_hanko_configuration === null) {
                $this->_hanko_configuration = new HankoConfigurationEntity($this, null);
            }
            return $this->_hanko_configuration;
        }
        return new HankoConfigurationEntity($this, $data);
    }


    private $_json_web_key_set = null;

    // Canonical facade: $client->JsonWebKeySet()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->json_web_key_set()
    // resolves here too.
    public function JsonWebKeySet($data = null)
    {
        require_once __DIR__ . '/entity/json_web_key_set_entity.php';
        if ($data === null) {
            if ($this->_json_web_key_set === null) {
                $this->_json_web_key_set = new JsonWebKeySetEntity($this, null);
            }
            return $this->_json_web_key_set;
        }
        return new JsonWebKeySetEntity($this, $data);
    }


    private $_passcode = null;

    // Canonical facade: $client->Passcode()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->passcode()
    // resolves here too.
    public function Passcode($data = null)
    {
        require_once __DIR__ . '/entity/passcode_entity.php';
        if ($data === null) {
            if ($this->_passcode === null) {
                $this->_passcode = new PasscodeEntity($this, null);
            }
            return $this->_passcode;
        }
        return new PasscodeEntity($this, $data);
    }


    private $_password = null;

    // Canonical facade: $client->Password()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->password()
    // resolves here too.
    public function Password($data = null)
    {
        require_once __DIR__ . '/entity/password_entity.php';
        if ($data === null) {
            if ($this->_password === null) {
                $this->_password = new PasswordEntity($this, null);
            }
            return $this->_password;
        }
        return new PasswordEntity($this, $data);
    }


    private $_saml = null;

    // Canonical facade: $client->Saml()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->saml()
    // resolves here too.
    public function Saml($data = null)
    {
        require_once __DIR__ . '/entity/saml_entity.php';
        if ($data === null) {
            if ($this->_saml === null) {
                $this->_saml = new SamlEntity($this, null);
            }
            return $this->_saml;
        }
        return new SamlEntity($this, $data);
    }


    private $_session_management = null;

    // Canonical facade: $client->SessionManagement()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->session_management()
    // resolves here too.
    public function SessionManagement($data = null)
    {
        require_once __DIR__ . '/entity/session_management_entity.php';
        if ($data === null) {
            if ($this->_session_management === null) {
                $this->_session_management = new SessionManagementEntity($this, null);
            }
            return $this->_session_management;
        }
        return new SessionManagementEntity($this, $data);
    }


    private $_status = null;

    // Canonical facade: $client->Status()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->status()
    // resolves here too.
    public function Status($data = null)
    {
        require_once __DIR__ . '/entity/status_entity.php';
        if ($data === null) {
            if ($this->_status === null) {
                $this->_status = new StatusEntity($this, null);
            }
            return $this->_status;
        }
        return new StatusEntity($this, $data);
    }


    private $_third_party = null;

    // Canonical facade: $client->ThirdParty()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->third_party()
    // resolves here too.
    public function ThirdParty($data = null)
    {
        require_once __DIR__ . '/entity/third_party_entity.php';
        if ($data === null) {
            if ($this->_third_party === null) {
                $this->_third_party = new ThirdPartyEntity($this, null);
            }
            return $this->_third_party;
        }
        return new ThirdPartyEntity($this, $data);
    }


    private $_token = null;

    // Canonical facade: $client->Token()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->token()
    // resolves here too.
    public function Token($data = null)
    {
        require_once __DIR__ . '/entity/token_entity.php';
        if ($data === null) {
            if ($this->_token === null) {
                $this->_token = new TokenEntity($this, null);
            }
            return $this->_token;
        }
        return new TokenEntity($this, $data);
    }


    private $_user = null;

    // Canonical facade: $client->User()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->user()
    // resolves here too.
    public function User($data = null)
    {
        require_once __DIR__ . '/entity/user_entity.php';
        if ($data === null) {
            if ($this->_user === null) {
                $this->_user = new UserEntity($this, null);
            }
            return $this->_user;
        }
        return new UserEntity($this, $data);
    }


    private $_user_management = null;

    // Canonical facade: $client->UserManagement()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->user_management()
    // resolves here too.
    public function UserManagement($data = null)
    {
        require_once __DIR__ . '/entity/user_management_entity.php';
        if ($data === null) {
            if ($this->_user_management === null) {
                $this->_user_management = new UserManagementEntity($this, null);
            }
            return $this->_user_management;
        }
        return new UserManagementEntity($this, $data);
    }


    private $_web_authn = null;

    // Canonical facade: $client->WebAuthn()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->web_authn()
    // resolves here too.
    public function WebAuthn($data = null)
    {
        require_once __DIR__ . '/entity/web_authn_entity.php';
        if ($data === null) {
            if ($this->_web_authn === null) {
                $this->_web_authn = new WebAuthnEntity($this, null);
            }
            return $this->_web_authn;
        }
        return new WebAuthnEntity($this, $data);
    }


    private $_webauthn_login = null;

    // Canonical facade: $client->WebauthnLogin()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->webauthn_login()
    // resolves here too.
    public function WebauthnLogin($data = null)
    {
        require_once __DIR__ . '/entity/webauthn_login_entity.php';
        if ($data === null) {
            if ($this->_webauthn_login === null) {
                $this->_webauthn_login = new WebauthnLoginEntity($this, null);
            }
            return $this->_webauthn_login;
        }
        return new WebauthnLoginEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new HankoPublicSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
