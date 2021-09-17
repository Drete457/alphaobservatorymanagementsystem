import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import {
  CHeader,
  CHeaderNav,
  CSubheader,
  CToggler,
  CBreadcrumbRouter,
} from '@coreui/react';
import HeaderAccountDropdown from '../header-drop-down';
import { fb } from 'api';
import CIcon from '@coreui/icons-react';

import { sidebarShow, asideShow } from 'state/atoms';

// routes config
import routes from 'routes';
import userHandler from 'helpers/user';
import Button from 'components/button/button';

const Header = () => {
  const [t] = useTranslation();
  const [isSidebarShow, setIsSidebarShow] = useRecoilState(sidebarShow);
  const [isAsideShow, setAsideShow] = useRecoilState(asideShow);
  const isMobile = !userHandler.screenOrientation(false);

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(isSidebarShow)
      ? false
      : 'responsive';
    setIsSidebarShow(val);
  };

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(isSidebarShow)
      ? true
      : 'responsive';
    setIsSidebarShow(val);
  };

  const logOut = async () => {
    const firebase = await fb();
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.clear();
        window.location.reload();
      });
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />

      <CHeaderNav className="d-md-down-none ml-auto">
        <CToggler
          inHeader
          className="d-md-down-none"
          onClick={() => setAsideShow(!isAsideShow)}
        >
          <CIcon className="mr-2" size="lg" name="cil-applications-settings" />
        </CToggler>
        <HeaderAccountDropdown logOut={logOut} />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        {isMobile && (
          <Button name={t('header.logout')} isDanger={false} onClick={logOut} />
        )}
      </CSubheader>
    </CHeader>
  );
};

export default memo(Header);
