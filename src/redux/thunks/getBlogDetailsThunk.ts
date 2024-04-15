import { createAsyncThunk } from '@reduxjs/toolkit';
import { getById } from '../../apis/blogApi';

const getBlogDetailsThunk = createAsyncThunk('data/getBlogDetails', async (id: string) => {
  const data = await getById(id);
  return data;
});

export default getBlogDetailsThunk;
