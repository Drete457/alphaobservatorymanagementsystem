import { lazy } from 'react';

const Home = lazy(() => import('./views/home'));
const MyProfile = lazy(() => import('./views/my-profile'));
const User = lazy(() => import('./views/user'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  {
    path: '/my-profile',
    exact: true,
    name: 'My Profile',
    component: MyProfile,
  },
  {
    path: '/user',
    exact: true,
    name: 'User',
    component: User,
  },
];

export default routes;
