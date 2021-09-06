import { lazy } from 'react';

const Activities = lazy(() => import('./activities'));
const Generic = lazy(() => import('./generic'));
const CardType = lazy(() => import('./card-type'));

const TabsViews = {
  Activities,
  Generic,
  CardType,
};

export default TabsViews;
