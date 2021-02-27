import { lazy } from 'react';

const Home = lazy(() => import('./views/home'));
const MyProfile = lazy(() => import('./views/my-profile'));
const UserRegistraion = lazy(() => import('./views/user/user-registration'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  {
    path: '/my-profile',
    exact: true,
    name: 'My Profile',
    component: MyProfile,
  },
  {
    path: '/user/:id',
    exact: true,
    name: 'User',
    component: UserRegistraion,
  },
];

export default routes;
