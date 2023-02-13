import { TypeWithKey } from '../models'

export const getValidationError = (errorCode: string) => {
  const codeMatcher: TypeWithKey<string> = {
    ERR_BAD_REQUEST: 'Bad request',
    ERR_NETWORK: 'Error in network',
    ERR_TIMEOUT: 'Timeout error',
    ERR_CANCEL: 'Request canceled',
    ERR_UNKNOWN: 'Unknown error',
    ERR_400: 'Error 400',
    ERR_401: 'Error 401',
    ERR_403: 'Error 403',
  }

  return codeMatcher[errorCode]
}
