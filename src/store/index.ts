import { configureStore } from '@reduxjs/toolkit'
import rootReducer from 'store/rootReducer'
import { newsApi } from '@/services/newsApi'
import { productsApi } from '@/services/productsApi'
import { uploadApi } from '@/services/uploadApi'

/**
 * Configures the Redux store by combining the root reducer with the API reducer,
 * and adding API middleware to the store.
 * Defines RootState and AppDispatch types based on the rootReducer and store dispatch.
 * @returns The configured Redux store.
 */

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware).concat(productsApi.middleware).concat(uploadApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store
