import { createSlice } from '@reduxjs/toolkit';
import getBlogsThunk from '../thunks/getBlogsThunk'
import { State } from './Slice';
import { IBlog } from '../../shared/types/Blog';

const initialState: State<IBlog> = { status: 'idle', data: [], error: '' }

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBlogsThunk.pending, state => {
            state.status = 'loading'
        })
        .addCase(getBlogsThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(getBlogsThunk.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Something went wrong';
        })
    }
})

export default blogSlice.reducer