import { lazy } from 'react';

const Home = lazy(() => import('./views/home'));
const MyProfile = lazy(() => import('./views/my-profile'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  {
    path: '/my-profile',
    exact: true,
    name: 'My Profile',
    component: MyProfile,
  },
];

export default routes;
