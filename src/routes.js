import { lazy } from 'react';

const Home = lazy(() => import('./views/home'));
const MyProfile = lazy(() => import('./views/my-profile'));
const UserRegistraion = lazy(() => import('./views/user/user-registration'));
const UserEdition = lazy(() => import('./views/user/user-edition'));
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
    path: '/user/new_user',
    exact: true,
    name: 'User Registration',
    component: UserRegistraion,
  },
  {
    path: '/user/edition/:id',
    exact: true,
    name: 'User Edit',
    component: UserEdition,
  },
  {
    path: '/user/view/:id',
    exact: true,
    name: 'User View',
    component: UserView,
  },
];

export default routes;
