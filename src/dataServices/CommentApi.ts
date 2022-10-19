import qs from 'qs';
import { placeholderApi } from './api';
import { CommentDto } from '../models/dto/Comment.dto';

export const commentsApiPath = '/comments';
const path = commentsApiPath;

const commentsApi = placeholderApi.injectEndpoints({
  endpoints: (build) => ({
    findComments: build.query<
      CommentDto[],
      | {
          ids?: number[] | string[];
          authorId?: string | number;
          postId?: string | number;
        }
      | undefined
    >({
      query: (arg) => {
        const filter = { ...arg, id: arg?.ids, userId: arg?.authorId };

        return `${path}?${qs.stringify(filter)}`;
      },
    }),
  }),
  overrideExisting: false,
});

export default commentsApi;
