import { combineReducers } from 'redux'
import { newsApi } from '@/services/newsApi'
import { productsApi } from '@/services/productsApi'
import { uploadApi } from '@/services/uploadApi'

/**
 * Combines multiple reducers into a single reducer function.
 * Includes reducers for API services and other application state.
 *
 * @returns The combined root reducer for the application.
 */

const rootReducer = combineReducers({
  // services
  [newsApi.reducerPath]: newsApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer,
})

export default rootReducer
