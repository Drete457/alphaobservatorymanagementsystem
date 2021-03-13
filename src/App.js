import { lazy, useState, useEffect, Suspense } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { CFade } from '@coreui/react';
import Loading from './components/loading';
import { useRecoilValue } from 'recoil';
import { user } from './state/atoms';
import './i18n';
import './scss/style.scss';

// components
const Layout = lazy(() => import('./components/layout'));
const Login = lazy(() => import('./views/login'));

const App = () => {
  const isUser = useRecoilValue(user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isUser) {
      setIsAuthenticated(true);
    }
  }, [isUser]);

  return (
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
  );
};

export default App;
