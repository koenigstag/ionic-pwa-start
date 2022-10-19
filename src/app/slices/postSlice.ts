import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostDto } from '../../models/dto/Post.dto';

export interface PostState {
  trendPosts: PostDto[];
}

const initialState: PostState = {
  trendPosts: [],
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setTrendPosts: (state, action: PayloadAction<PostDto[]>) => {
      state.trendPosts = action.payload;
    },
    
  },
});

export const { setTrendPosts } = postSlice.actions;

export default postSlice.reducer;
