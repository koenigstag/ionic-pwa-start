import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { placeholderApi } from '../dataServices/api';
import rootReducer from './slices';

const persistConfig = {
  key: 'root',
  storage,
  /* storage: {
    setItem: (key: string, value: string) => {
      console.log(key, value);
      return storage.setItem(key, value);
    },

    getItem: (key: string) => {
      console.log('get', key);
      return storage.getItem(key);
    },

    removeItem: (key: string) => {
      console.log('remove', key);
      return storage.removeItem(key);
    },
  }, */
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(placeholderApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
