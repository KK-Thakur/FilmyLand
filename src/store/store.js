import { configureStore } from '@reduxjs/toolkit'
import homeSliceReducer from '../features/home/homeSlice'

export const store = configureStore({
  reducer: {
    home: homeSliceReducer,  //when ever we want to excess this store we need use state.home.url but not state.url
  }
})
