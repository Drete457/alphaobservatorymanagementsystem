import React, { lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const Layout = lazy(() => import('./containers/layout'));

function App() {
  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            path="/"
            name="Home"
            render={(props) => <Layout {...props} />}
          />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

export default App;
