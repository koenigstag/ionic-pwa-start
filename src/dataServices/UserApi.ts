import qs from 'qs';
import { placeholderApi } from './api';
import { UserDto } from '../models/dto/User.dto';

export const usersApiPath = '/users';
const path = usersApiPath;

const usersApi = placeholderApi.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query<UserDto, void>({
      query: () => {
        const randomId = 1 + Math.floor(Math.random() * 10);

        return `${path}/${randomId}`;
      },
    }),

    findUserById: build.query<UserDto, string | number>({
      query: (id) => `${path}/${id}`,
    }),

    findUsers: build.query<UserDto[], number[] | string[] | undefined>({
      query: (ids) => {
        const query = { id: ids };

        return `${path}?${qs.stringify(query)}`;
      },
    }),
  }),
  overrideExisting: false,
});

export default usersApi;
