import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogDto } from '../../models/dto/Blog.dto';

export interface BlogState {
  trendBlogs: BlogDto[];
}

const initialState: BlogState = {
  trendBlogs: [],
};

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setTrendBlogs: (state, action: PayloadAction<BlogDto[]>) => {
      state.trendBlogs = action.payload;
    },
  },
});

export const { setTrendBlogs } = blogSlice.actions;

export default blogSlice.reducer;
