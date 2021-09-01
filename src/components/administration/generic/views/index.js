import { lazy } from 'react';

const Activities = lazy(() => import('./activities'));

const TabsViews = {
  Activities,
};

export default TabsViews;
