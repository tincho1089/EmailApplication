const baseUrl = 'http://localhost:3000'

export const Endpoints = {
  baseUrl,
  emailUrl: baseUrl + '/email/all',
  newEmailUrl: baseUrl + '/email/create',
  loginUrl: baseUrl + '/auth/login',
  signinUrl: baseUrl + '/auth/register',
  socketConn: 'http://localhost:8001',
}

export const formatUpdateEmailUrl = (id: string) => {
  return `${baseUrl}/email/${id}/update`
}
