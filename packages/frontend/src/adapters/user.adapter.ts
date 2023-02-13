import { UserInfo } from '@/models'

export const createUserAdapter = (user: UserInfo) => ({
  jwtToken: user.jwtToken,
  username: user.username,
})
