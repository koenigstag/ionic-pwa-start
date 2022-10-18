export const rootRoute = '/';

export const homePageRoute = `/feed`;
export const favoriteBlogsPageRoute = '/favorite';
export const profilePageRoute = '/profile';

export const blogPageRoute = '/blog/:id';
export const createBlogPageRoute = ({ id }: { id: string | number }) =>
  '/blog/:id'.replace(':id', id.toString());
export const postPageRoute = '/post/:id';
export const createPostPageRoute = ({ id }: { id: string | number }) =>
  '/post/:id'.replace(':id', id.toString());
