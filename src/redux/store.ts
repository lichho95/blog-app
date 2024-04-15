import {configureStore} from '@reduxjs/toolkit';
import blogReducer from './slices/blogSlice';
import blogDetailsReducer from './slices/blogDetailsSlice';

export const store = configureStore({
    reducer: {
        blogReducer,
        blogDetailsReducer
    }
})

export type AppDispatch = typeof store.dispatch