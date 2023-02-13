import { ApiEmail, Endpoints, formatUpdateEmailUrl, newEmail } from '@/models'
import axios from 'axios'

export const getEmails = (type: string): Promise<ApiEmail[]> => {
  const params = {
    type,
  }
  return axios.get(Endpoints.emailUrl, { params }).then((response) => response.data)
}

export const sendEmail = (email: newEmail) => {
  return axios.post(Endpoints.newEmailUrl, email)
}

export const updateEmail = (id: string, state: string) => {
  return axios.put(formatUpdateEmailUrl(id), { state })
}
