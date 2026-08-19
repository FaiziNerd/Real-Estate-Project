import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/UserSlice'
import { persistStore, persistReducer } from 'redux-persist'

const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),

  setItem: (key, value) => {
    localStorage.setItem(key, value)
    return Promise.resolve()
  },

  removeItem: (key) => {
    localStorage.removeItem(key)
    return Promise.resolve()
  },
}

const rootReducer = combineReducers({
  user: userReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
)

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store

export const persistor = persistStore(store)