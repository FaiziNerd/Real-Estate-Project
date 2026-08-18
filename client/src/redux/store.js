/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/UserSlice'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    user: userReducer
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistConfig)

export default configureStore({
  reducer: persistedReducer,

  middleware:(getdefaultMiddleware) => getdefaultMiddleware({
    serializableCheck: false,
  })
})


export const persistor = persistStore(store)