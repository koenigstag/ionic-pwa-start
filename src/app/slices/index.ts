import { combineReducers } from '@reduxjs/toolkit';
import { placeholderApi } from '../../dataServices/api';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  [placeholderApi.reducerPath]: placeholderApi.reducer,
});

export default rootReducer;
