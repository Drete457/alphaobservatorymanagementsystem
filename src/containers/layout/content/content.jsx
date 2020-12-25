import React, { Suspense, memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CFade } from '@coreui/react';

// routes config
import routes from '../../../routes';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const Content = () => {
  return (
    <main className="c-main">
      <Suspense fallback={loading}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )}
                />
              )
            );
          })}
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Suspense>
    </main>
  );
};

export default memo(Content);
