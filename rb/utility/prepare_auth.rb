# HankoPublic SDK utility: prepare_auth
require_relative 'struct/voxgig_struct'
require_relative 'prepare_headers'
module HankoPublicUtilities
  COOKIE_AUTH = "hanko"
  HEADER_COOKIE = "cookie"
  OPTION_APIKEY = "apikey"
  NOT_FOUND = "__NOTFOUND__"

  PrepareAuth = ->(ctx) {
    spec = ctx.spec
    return nil, ctx.make_error("auth_no_spec", "Expected context spec property to be defined.") unless spec

    headers = spec.headers
    options = ctx.client.options_map

    # The named pair, and only that one: another cookie the caller set survives.
    set_cookie = ->(hs, cname, value) {
      cookie = hs[HEADER_COOKIE]
      rest = cookie.is_a?(String) ? HankoPublicUtilities.cookie_keep(cookie, [cname]) : []
      rest << "#{cname}=#{value}" unless value.nil?
      if rest.empty?
        hs.delete(HEADER_COOKIE)
      else
        hs[HEADER_COOKIE] = rest.join("; ")
      end
    }

    # Public APIs that need no auth omit the options.auth block entirely.
    if options["auth"].nil?
      set_cookie.call(headers, COOKIE_AUTH, nil)
      return spec, nil
    end

    # The client's auth.name option, when set, replaces the name the API declares.
    auth_name = VoxgigStruct.getpath(options, "auth.name")
    name = auth_name.is_a?(String) && !auth_name.empty? ? auth_name : COOKIE_AUTH

    # A credential left under the declared name would travel beside the renamed one.
    set_cookie.call(headers, COOKIE_AUTH, nil) unless name == COOKIE_AUTH

    apikey = VoxgigStruct.getprop(options, OPTION_APIKEY, NOT_FOUND)

    if apikey.nil? || (apikey.is_a?(String) && (apikey == NOT_FOUND || apikey == ""))
      set_cookie.call(headers, name, nil)
    else
      apikey_val = apikey.is_a?(String) ? apikey : ""
      # Spliced in, replacing an earlier pair of the same name, so a retry
      # cannot accumulate it. No prefix: `token=Bearer abc` is not a cookie
      # value any API reads.
      set_cookie.call(headers, name, apikey_val)
    end

    return spec, nil
  }
end
