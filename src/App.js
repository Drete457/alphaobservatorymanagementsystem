import React, { lazy, useState } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { CFade } from '@coreui/react';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const Layout = lazy(() => import('./containers/layout'));
const Login = lazy(() => import('./views/login'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login"
            component={() => <Login set={setIsAuthenticated} />}
          />
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
      </React.Suspense>
    </HashRouter>
  );
}

export default App;
