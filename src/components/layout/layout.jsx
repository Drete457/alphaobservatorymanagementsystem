import Sidebar from './sidebar';
import Aside from './aside';
import Header from './header';
import Content from './content';

const Layout = () => {
  return (
    <div className="c-app c-classic-layout">
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
