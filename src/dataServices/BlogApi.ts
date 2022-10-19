import qs from 'qs';
import { placeholderApi } from './api';
import { postsApiPath } from './PostApi';
import { UserDto } from '../models/dto/User.dto';
import { BlogDto } from '../models/dto/Blog.dto';
import { PostDto } from '../models/dto/Post.dto';

export const blogsApiPath = '/users';
const path = blogsApiPath;

const blogsApi = placeholderApi.injectEndpoints({
  endpoints: (build) => ({
    findBlogById: build.query<BlogDto, string | number>({
      async queryFn(blogId, api, extraOptions, baseQuery) {
        const { data: blog } = (await baseQuery({
          url: `${path}/${blogId}`,
        })) as { data: UserDto };

        const { data: posts } = (await baseQuery({
          url: `${postsApiPath}?${qs.stringify({ userId: blog.id })}`,
        })) as { data: PostDto[] };

        return { data: { ...blog, posts } };
      },
    }),

    findFavBlogs: build.query<BlogDto[], number | string>({
      query: (userId) => {
        const randomIds = Array(5)
          .fill(userId)
          .map(() => Math.floor(Math.random() * 10));
        const query = { id: randomIds };

        return `${path}?${qs.stringify(query)}`;
      },
    }),

    getTrendBlogs: build.query<BlogDto[], void>({
      query: () => {
        const randomIds = Array(5)
          .fill(1)
          .map(() => Math.floor(Math.random() * 10));
        const query = { id: randomIds };

        return `${path}?${qs.stringify(query)}`;
      },
    }),
  }),
  overrideExisting: false,
});

export default blogsApi;
