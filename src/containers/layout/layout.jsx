import React, { useState } from 'react';
import classNames from 'classnames';

import Sidebar from './sidebar';
import Aside from './aside';
import Header from './header';
import Content from './content';

import ErrorInfo from '../error';

const Layout = () => {
  const classes = classNames('c-app c-default-layout');
  const [error, setError] = useState(null);

  return (
    <div className={classes}>
      <Sidebar />
      <Aside />
      <div className="c-wrapper">
        <Header />
        <div className="c-body">
          {error ? (
            <ErrorInfo error={error} />
          ) : (
            <Content setError={setError} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
