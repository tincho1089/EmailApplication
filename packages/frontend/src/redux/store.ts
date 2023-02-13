import { Email, UserInfo } from '@/models'
import { configureStore } from '@reduxjs/toolkit'
import emailSlice from './states/email'
import userSlice from './states/user'

export interface AppStore {
  user: UserInfo
  email: Email[]
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    email: emailSlice.reducer,
  },
})
