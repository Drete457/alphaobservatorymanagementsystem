import { lazy, useState, useLayoutEffect, Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { CFade } from '@coreui/react';
import { useRecoilState } from 'recoil';
import { user } from 'state/atoms';
import { noInternetImg } from 'assets/images';
import { buildLogin } from 'helpers/users';
import Loading from 'components/loading';
import NoInternet from 'views/offline';
import ErrorBoundry from 'components/error-boundary';
import './i18n';
import './scss/style.scss';

// components
const Layout = lazy(() => import('./components/layout'));
const Login = lazy(() => import('./views/login'));
const Safari = lazy(() => import('./views/safari-browser'));

const App = () => {
  const [isUser, setIsUser] = useRecoilState(user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isSafariDesktop, setIsSafariDesktop] = useState(true);

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

  useLayoutEffect(() => {
    const isMobileDevice = () => {
      return (
        typeof window.orientation !== 'undefined' ||
        navigator.userAgent.indexOf('IEMobile') !== -1
      );
    };

    let isMobile = isMobileDevice();

    if (!isMobile) {
      //defect if is safari
      const isSafari = navigator.userAgent.indexOf('Safari') > -1;
      //chrome brownser on MacOs came with Safari word to
      const isChrome = navigator.userAgent.indexOf('Chrome') > -1;

      if (isSafari) {
        isChrome ? setIsSafariDesktop(false) : setIsSafariDesktop(true);
      }
    }
  }, []);

  window.ononline = () => {
    setIsOnline(true);
  };

  window.onoffline = () => {
    setIsOnline(false);
  };

  //refresh the page and send to the original homepage
  const refreshPage = () => {
    window.location.href = '/';
  };
  //every 12 hours
  setTimeout(refreshPage, 1000 * 60 * 60 * 12);

  return (
    <>
      <HashRouter>
        <Suspense fallback={<Loading />}>
          {isSafariDesktop ? (
            <Safari />
          ) : (
            <Switch>
              <Route
                path="/"
                name="Home"
                render={() => {
                  return isAuthenticated ? (
                    <CFade>
                      <ErrorBoundry>
                        <Layout />
                      </ErrorBoundry>
                    </CFade>
                  ) : (
                    <CFade>
                      <Login />
                    </CFade>
                  );
                }}
              />
            </Switch>
          )}
        </Suspense>
      </HashRouter>
      {!isOnline && <NoInternet />}
    </>
  );
};

export default App;
