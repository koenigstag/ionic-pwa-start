import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserDto } from '../../models/dto/User.dto';
import { PostDto } from '../../models/dto/Post.dto';
import { BlogDto } from '../../models/dto/Blog.dto';

export interface UserState {
  isOnline: boolean;
  data: UserDto | null;
  selectedBlog: BlogDto | null;
  selectedPost: PostDto | null;
  favBlogs: BlogDto[] | null;
}

const initialState: UserState = {
  isOnline: false,
  data: null,
  selectedBlog: null,
  selectedPost: null,
  favBlogs: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserDto>) => {
      state.data = action.payload;
    },
    setSelectedBlog: (state, action: PayloadAction<BlogDto>) => {
      state.selectedBlog = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<PostDto>) => {
      state.selectedPost = action.payload;
    },
    setFavBlogs: (state, action: PayloadAction<BlogDto[]>) => {
      state.favBlogs = action.payload;
    },
    clearUserData: (state) => {
      state.data = null;
    },
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
    clearFavBlogs: (state) => {
      state.favBlogs = null;
    },
  },
});

export const {
  setIsOnline,
  setUserData,
  setSelectedBlog,
  setSelectedPost,
  setFavBlogs,
  clearUserData,
  clearSelectedBlog,
  clearSelectedPost,
  clearFavBlogs,
} = userSlice.actions;

export default userSlice.reducer;
