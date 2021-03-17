import { lazy, useState, useLayoutEffect, Suspense } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { CFade } from '@coreui/react';
import { useRecoilValue } from 'recoil';
import { user } from './state/atoms';
import './i18n';
import './scss/style.scss';
import Loading from './components/loading';
import NoInternet from './views/offline';
import { noInternetImg } from './assets/images';

// components
const Layout = lazy(() => import('./components/layout'));
const Login = lazy(() => import('./views/login'));

const App = () => {
  const isUser = useRecoilValue(user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

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
            <Route exact path="/login" name="Login" component={Login} />
            <Route
              path="/"
              name="Home"
              render={({ location }) => {
                const redirectLocation = {
                  pathname: '/login',
                  state: { from: location },
                };
                return isAuthenticated ? (
                  <CFade>
                    <Layout />
                  </CFade>
                ) : (
                  <Redirect push to={redirectLocation} />
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
