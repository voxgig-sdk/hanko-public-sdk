<?php
declare(strict_types=1);

// HankoPublic SDK base feature

class HankoPublicBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(HankoPublicContext $ctx, array $options): void {}
    public function PostConstruct(HankoPublicContext $ctx): void {}
    public function PostConstructEntity(HankoPublicContext $ctx): void {}
    public function SetData(HankoPublicContext $ctx): void {}
    public function GetData(HankoPublicContext $ctx): void {}
    public function GetMatch(HankoPublicContext $ctx): void {}
    public function SetMatch(HankoPublicContext $ctx): void {}
    public function PrePoint(HankoPublicContext $ctx): void {}
    public function PreSpec(HankoPublicContext $ctx): void {}
    public function PreRequest(HankoPublicContext $ctx): void {}
    public function PreResponse(HankoPublicContext $ctx): void {}
    public function PreResult(HankoPublicContext $ctx): void {}
    public function PreDone(HankoPublicContext $ctx): void {}
    public function PreUnexpected(HankoPublicContext $ctx): void {}
}
