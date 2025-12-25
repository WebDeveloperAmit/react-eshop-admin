import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './redux/slices/loaderSlice';

const store = configureStore({
  reducer: {
    loader: loaderReducer
  }
});

export default store;