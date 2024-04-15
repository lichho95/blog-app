import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAll } from '../../apis/blogApi';

const getBlogsThunk = createAsyncThunk('data/getBlogs', async () => {
  const data = await getAll();

  return data;
});

export default getBlogsThunk;
