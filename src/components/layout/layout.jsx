import classNames from 'classnames';
import Sidebar from './sidebar';
import Aside from './aside';
import Header from './header';
import Content from './content';

const Layout = () => {
  const classes = classNames('c-app c-classic-layout');

  return (
    <div className={classes}>
      <Sidebar />
      <Aside />
      <div className="c-wrapper">
        <Header />
        <div className="c-body">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Layout;
