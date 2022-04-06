import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { fb } from 'api/config';
import { noInternetImg } from 'assets/images';
import { icons } from './assets/icons';
import { RecoilRoot } from 'recoil';
import Maintenance from 'views/maintenence';

React.icons = icons;

//iniciate firebase sdk
const startFirebase = async () => {
  await fb();
};

//refresh the page and send to the original homepage
const refreshPage = () => {
  window.location.href = '/';
};

startFirebase();

//every 12 hours
setTimeout(refreshPage, 3000 * 60 * 60 * 12);

//use this if you need to have big fix and the site has to be offline
const isUpdating = false;
const image = localStorage.getItem('offline');

if (!image) {
  //converte the imagem em string to be safe on localStorage
  let xhr = new XMLHttpRequest();
  xhr.open('GET', noInternetImg, true);
  xhr.responseType = 'blob';
  xhr.onload = function (e) {
    let reader = new FileReader();
    reader.onload = function (event) {
      let res = event.target.result;

      localStorage.setItem('offline', res);
    };
    var file = this.response;
    reader.readAsDataURL(file);
  };
  xhr.send();
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RecoilRoot>{isUpdating ? <Maintenance /> : <App />}</RecoilRoot>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
