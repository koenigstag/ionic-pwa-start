import { ReactNode } from "react";
import HomePage from "./pages/Home";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";

export type RouteObject = {
  exact?: boolean;
  path?: string | string[];
  children?: ReactNode | ReactNode[];
}

export type RouteConfig = RouteObject[];

const routes: RouteConfig = [
  {
    path: ['/', '/tab1'],
    children: [
      <HomePage />
    ]
  },
  {
    path: '/tab2',
    children: [
      <Tab2 />
    ]
  },
  {
    path: '/tab3',
    children: [
      <Tab3 />
    ]
  }
];

export default routes;
