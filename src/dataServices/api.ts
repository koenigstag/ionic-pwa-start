// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import configService, { Config } from './ConfigService';

// Define a service using a base URL and expected endpoints
// TODO redux toolkit query with axios instance
export const placeholderApi = createApi({
  reducerPath: 'jsonPlaceholderApi',
  baseQuery: fetchBaseQuery({ baseUrl: configService.get(Config.API_URL) }),
  endpoints: (build) => ({
    isOnline: build.query<void, void>({
      query: () => {
        return '/';
      },
    }),
  }),
});

export type QueryBuilder = {
  query<ResultType, QueryArg>(definition: {
    query(arg: QueryArg): string;
  }): ResultType;
};

export type ApiType = typeof placeholderApi;
