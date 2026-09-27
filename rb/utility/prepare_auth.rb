# HankoPublic SDK utility: prepare_auth
require_relative 'struct/voxgig_struct'
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

    # Our own pair, and only ours: another cookie the caller set survives.
    drop_cookie = ->(hs) {
      cookie = hs[HEADER_COOKIE]
      return unless cookie.is_a?(String)
      rest = cookie.split("; ").reject { |pair| pair.start_with?("#{COOKIE_AUTH}=") }
      if rest.empty?
        hs.delete(HEADER_COOKIE)
      else
        hs[HEADER_COOKIE] = rest.join("; ")
      end
    }

    # Public APIs that need no auth omit the options.auth block entirely.
    if options["auth"].nil?
      drop_cookie.call(headers)
      return spec, nil
    end

    apikey = VoxgigStruct.getprop(options, OPTION_APIKEY, NOT_FOUND)

    # Dropped before writing, so a retry cannot accumulate the pair and a
    # withdrawn credential leaves no stale cookie behind.
    drop_cookie.call(headers)

    unless apikey.nil? || (apikey.is_a?(String) && (apikey == NOT_FOUND || apikey == ""))
      apikey_val = apikey.is_a?(String) ? apikey : ""
      # A cookie IS a header, so the pair is appended to the cookie header
      # rather than clobbering it. No prefix: `token=Bearer abc` is not a
      # cookie value any API reads.
      existing = headers[HEADER_COOKIE]
      pair = "#{COOKIE_AUTH}=#{apikey_val}"
      headers[HEADER_COOKIE] =
        (existing.is_a?(String) && !existing.empty?) ? "#{existing}; #{pair}" : pair
    end

    return spec, nil
  }
end
