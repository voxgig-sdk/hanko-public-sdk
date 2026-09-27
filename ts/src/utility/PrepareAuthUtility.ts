
import { Context, Spec } from '../types'


const CRED_name = 'hanko'

const COOKIE_header = 'cookie'

const OPTION_apikey = 'apikey'
const OPTION_secret = 'secret'

const NOTFOUND = '__NOTFOUND__'


function prepareAuth(ctx: Context): Spec | Error {
  const utility = ctx.utility

  const struct = utility.struct
  const getprop = struct.getprop
  const setprop = struct.setprop
  const delprop = struct.delprop

  const client = ctx.client
  const spec = ctx.spec

  if (null == spec) {
    return ctx.error('auth_no_spec', 'Expected context spec property to be defined.')
  }

  const headers = spec.headers

  function cookieSet(headers: any, value: any) {
    const existing = getprop(headers, COOKIE_header, '')
    const kept: string[] = []

    if ('string' === typeof existing && '' !== existing) {
      for (const part of existing.split(';')) {
        const piece = part.trim()
        if ('' === piece || piece === CRED_name || piece.startsWith(CRED_name + '=')) {
          continue
        }
        kept.push(piece)
      }
    }

    if (null != value) {
      kept.push(CRED_name + '=' + value)
    }

    if (0 === kept.length) {
      delprop(headers, COOKIE_header)
    }
    else {
      setprop(headers, COOKIE_header, kept.join('; '))
    }
  }

  const options = client.options()

  // Public APIs that need no auth omit the options.auth block entirely.
  if (null == options.auth) {
    cookieSet(headers, null)
    return spec
  }

  const prefix = options.auth.prefix

  const apikey = getprop(options, OPTION_apikey, NOTFOUND)

  if (NOTFOUND === apikey || null == apikey || '' === apikey) {
    cookieSet(headers, null)
  }
  else {
    cookieSet(headers, apikey)
  }

  return spec
}


export {
  prepareAuth
}
