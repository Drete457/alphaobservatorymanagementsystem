import { lazy, useState, useLayoutEffect, Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { CFade } from '@coreui/react';
import { useRecoilState } from 'recoil';
import { user } from 'state/atoms';
import { noInternetImg } from 'assets/images';
import Loading from 'components/loading';
import NoInternet from 'views/offline';
import buildLogin from 'helpers/users';
import './i18n';
import './scss/style.scss';

// components
const Layout = lazy(() => import('./components/layout'));
const Login = lazy(() => import('./views/login'));

const App = () => {
  const [isUser, setIsUser] = useRecoilState(user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useLayoutEffect(() => {
    buildLogin(setIsUser);
  }, [setIsUser]);

  useLayoutEffect(() => {
    if (isUser) {
      setIsAuthenticated(true);
    }
  }, [isUser]);

  useLayoutEffect(() => {
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
  }, []);

  window.ononline = () => {
    setIsOnline(true);
  };

  window.onoffline = () => {
    setIsOnline(false);
  };

  return (
    <>
      <HashRouter>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route
              path="/"
              name="Home"
              render={() => {
                return isAuthenticated ? (
                  <CFade>
                    <Layout />
                  </CFade>
                ) : (
                  <CFade>
                    <Login />
                  </CFade>
                );
              }}
            />
          </Switch>
        </Suspense>
      </HashRouter>
      {!isOnline && <NoInternet />}
    </>
  );
};

export default App;
