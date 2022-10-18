import { Redirect, Route } from 'react-router';
import HomePage from './pages/Home';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

export type RouteObject = {
  exact?: boolean;
  path?: string | string[];
  children?: React.ReactNode | React.ReactNode[];
  component?: React.ComponentType<any>;
};

export type RouteConfig = RouteObject[];

export const routes: RouteConfig = [
  {
    path: ['/', '/tab1'],
    component: HomePage,
  },
  {
    path: '/tab2',
    component: Tab2,
  },
  {
    path: '/tab3',
    component: Tab3,
  },
  {
    exact: false,
    children: <Redirect to="/" />,
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
