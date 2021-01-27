import { lazy } from 'react';

const Home = lazy(() => import('./views/home'));

const routes = [{ path: '/', exact: true, name: 'Home', component: Home }];

export default routes;
