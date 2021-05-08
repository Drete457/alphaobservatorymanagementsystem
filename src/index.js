import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Maintenance from 'views/maintenence';
import * as serviceWorker from './serviceWorker';

import { icons } from './assets/icons';
import { RecoilRoot } from 'recoil';

React.icons = icons;

//use this if you need to have big fix and the site has to be offline
const isUpdating = false;

ReactDOM.render(
  <RecoilRoot>{isUpdating ? <Maintenance /> : <App />}</RecoilRoot>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
