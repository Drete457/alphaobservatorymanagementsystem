import { lazy } from 'react';

const Activities = lazy(() => import('./activities'));
const Generic = lazy(() => import('./generic'));

const TabsViews = {
  Activities,
  Generic,
};

export default TabsViews;
