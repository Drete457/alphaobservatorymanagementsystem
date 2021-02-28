import { lazy } from 'react';

const Home = lazy(() => import('./views/home'));
const MyProfile = lazy(() => import('./views/my-profile'));
const UserRegistraion = lazy(() => import('./views/user/user-registration'));
const UserView = lazy(() => import('./views/user/user-view'));

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
    name: 'User Registration',
    component: UserRegistraion,
  },
  {
    path: '/user/:id',
    exact: true,
    name: 'User View',
    component: UserView,
  },
];

export default routes;
