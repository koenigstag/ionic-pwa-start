import qs from 'qs';
import { placeholderApi } from './api';
import { PostDto } from '../models/dto/Post.dto';
import { UserDto } from '../models/dto/User.dto';
import { CommentDto } from '../models/dto/Comment.dto';
import { usersApiPath } from './UserApi';
import { commentsApiPath } from './CommentApi';

export const postsApiPath = '/posts';
const path = postsApiPath;

const postsApi = placeholderApi.injectEndpoints({
  endpoints: (build) => ({
    findPosts: build.query<
      PostDto[],
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

    findPostById: build.query<PostDto, number | string>({
      async queryFn(arg, api, extraOptions, baseQuery) {
        const { data: post } = (await baseQuery({ url: `${path}/${arg}` })) as {
          data: PostDto;
        };

        const { data: author } = (await baseQuery({
          url: `${usersApiPath}/${post.userId}`,
        })) as {
          data: UserDto;
        };

        const { data: comments } = (await baseQuery({
          url: `${commentsApiPath}?${qs.stringify({ postId: post.id })}`,
        })) as {
          data: CommentDto[];
        };

        return { data: { ...post, author, comments } };
      },
    }),

    getTrendPosts: build.query<PostDto[], void>({
      async queryFn(arg, api, extraOptions, baseQuery) {
        const randomIds = Array(5)
          .fill(1)
          .map(() => Math.floor(Math.random() * 100));

        const query = { id: randomIds };

        const { data: posts } = (await baseQuery({
          url: `${path}?${qs.stringify(query)}`,
        })) as { data: PostDto[] };

        const userIds = posts.map((p) => p.userId);

        const { data: authors } = (await baseQuery({
          url: `${usersApiPath}?${qs.stringify({ ids: userIds })}`,
        })) as { data: UserDto[] };

        const postsWithAuthors = posts.map((post, index) => ({
          ...post,
          author: authors[index],
        }));

        return { data: postsWithAuthors };
      },
    }),
  }),
  overrideExisting: false,
});

export default postsApi;
