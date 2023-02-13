import { Email } from '@/models'
import { createSlice } from '@reduxjs/toolkit'

export const EmptyEmailState: Email[] = [
  {
    id: '',
    from: '',
    to: '',
    subject: '',
    body: '',
    date: new Date().toString(),
    state: '',
  },
]

export const EmailKey = 'email'

export const emailSlice = createSlice({
  name: 'email',
  initialState: EmptyEmailState,
  reducers: {
    listEmails: (state, action) => {
      return action.payload
    },
    updateListEmails: (state, action) => {
      const result = { ...state, ...action.payload }
      return result
    },
    resetListEmail: () => {
      return EmptyEmailState
    },
  },
})

export const { listEmails, updateListEmails, resetListEmail } = emailSlice.actions

export default emailSlice
