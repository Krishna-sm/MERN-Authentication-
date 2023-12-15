import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slices/User.slice'
import { AuthApi } from './queries/Auth.query'
import { setupListeners } from '@reduxjs/toolkit/query'
export const store = configureStore({
  reducer: {
    [userSlice.name]:userSlice.reducer,
    [AuthApi.reducerPath]:AuthApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware),
})

setupListeners(store.dispatch)