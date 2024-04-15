import { IBlog } from '../../shared/types/Blog';
import { createSlice } from '@reduxjs/toolkit';
import getBlogDetailsThunk from '../thunks/getBlogDetailsThunk'; 

export interface BlogDetailsState {
  data: IBlog;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BlogDetailsState = {
  data: {} as IBlog,
  status: 'idle',
  error: null,
};

const blogDetailsSlice = createSlice({
  name: 'blogDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogDetailsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBlogDetailsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getBlogDetailsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default blogDetailsSlice.reducer;