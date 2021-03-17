import { Suspense, memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CFade } from '@coreui/react';
import Loading from '../../loading';

// routes config
import routes from '../../../routes';

const Content = () => {
  return (
    <main className="c-main">
      <Suspense fallback={<Loading />}>
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
          <Redirect from="/" to="/construction" />
        </Switch>
      </Suspense>
    </main>
  );
};

export default memo(Content);
