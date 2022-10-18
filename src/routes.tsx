import { Redirect, Route } from 'react-router';
import HomePage from './pages/Home';
import FavoriteBlogsPage from './pages/FavoriteBlogs';
import ProfilePage from './pages/Profile';
import {
  blogPageRoute,
  favoriteBlogsPageRoute,
  homePageRoute,
  postPageRoute,
  profilePageRoute,
  rootRoute,
} from './constants/routes';
import PostPage from './pages/Post';
import BlogPage from './pages/Blog';

export type RouteObject = {
  exact?: boolean;
  path?: string | string[];
  children?: React.ReactNode | React.ReactNode[];
  component?: React.ComponentType<any>;
};

export type RouteConfig = RouteObject[];

export const routes: RouteConfig = [
  {
    path: [rootRoute, homePageRoute],
    component: HomePage,
  },
  {
    path: favoriteBlogsPageRoute,
    component: FavoriteBlogsPage,
  },
  {
    path: profilePageRoute,
    component: ProfilePage,
  },
  {
    exact: false,
    path: blogPageRoute,
    component: BlogPage,
  },
  {
    exact: false,
    path: postPageRoute,
    component: PostPage,
  },
  {
    exact: false,
    children: <Redirect to={homePageRoute} />,
  },
];

export const IonRoutes: React.FC = () => {
  return (
    <>
      {routes.map((r) => (
        <Route
          key={r.path?.toString()}
          exact={r.exact ?? true}
          path={r.path}
          component={r.component}
        >
          {r.children}
        </Route>
      ))}
    </>
  );
};
