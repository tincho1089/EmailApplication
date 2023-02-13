import axios from 'axios'
import { Endpoints, User, UserInfo } from '@/models'

export const logIn = (user: User): Promise<UserInfo> => {
  return axios.post(Endpoints.loginUrl, user).then((response) => response.data)
}

export const signIn = (user: User) => {
  return axios.post(Endpoints.signinUrl, user)
}
