import { lazy, useState, useLayoutEffect, Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { CFade } from '@coreui/react';
import { useRecoilState } from 'recoil';
import { user } from 'state/atoms';
import { buildLogin } from 'helpers/users';
import Loading from 'components/loading';
import NoInternet from 'views/offline';
import ErrorBoundary from 'components/error-boundary';
import './i18n';
import './scss/style.scss';

// components
const Layout = lazy(() => import('./components/layout'));
const Login = lazy(() => import('./views/login'));
const Safari = lazy(() => import('./views/safari-browser'));
const RegistrationForm = lazy(() => import('./views/registration-form'));

const App = () => {
  const [isUser, setIsUser] = useRecoilState(user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isSafariDesktop, setIsSafariDesktop] = useState(false);

  useLayoutEffect(() => {
    const startFirebase = async () => {
      await buildLogin(setIsUser);
    };

    startFirebase();
  }, [setIsUser]);

  useLayoutEffect(() => {
    if (isUser) setIsAuthenticated(true);
  }, [isUser]);

  useLayoutEffect(() => {
    const isMobileDevice = () => {
      return (
        typeof window.orientation !== 'undefined' ||
        navigator.userAgent.indexOf('IEMobile') !== -1
      );
    };

    const isDesktop = !isMobileDevice();

    if (isDesktop) {
      //defect if is safari
      const isSafari = navigator.userAgent.indexOf('Safari') > -1;
      //chrome browser on MacOs came with Safari word to
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

  return (
    <>
      <HashRouter>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route
              path="/registration-form"
              name="Registration Form"
              exact
              render={() => (
                <CFade>
                  <ErrorBoundary>
                    <RegistrationForm />
                  </ErrorBoundary>
                </CFade>
              )}
            />
            {isSafariDesktop ? (
              <Safari />
            ) : (
              <Route
                path="/"
                name="Home"
                render={() => {
                  return isAuthenticated ? (
                    <CFade>
                      <ErrorBoundary>
                        <Layout />
                      </ErrorBoundary>
                    </CFade>
                  ) : (
                    <CFade>
                      <Login />
                    </CFade>
                  );
                }}
              />
            )}
          </Switch>
        </Suspense>
      </HashRouter>

      {!isOnline && <NoInternet />}
    </>
  );
};

export default App;
