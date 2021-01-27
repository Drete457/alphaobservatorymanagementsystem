import React, { memo } from 'react';
import { useRecoilState } from 'recoil';
import {
  CHeader,
  CHeaderNav,
  CSubheader,
  CToggler,
  CBreadcrumbRouter,
} from '@coreui/react';
import HeaderAccountDropdown from '../header-drop-down';
import CIcon from '@coreui/icons-react';

import { sidebarShow, asideShow } from '../../../state/atoms';

// routes config
import routes from '../../../routes';

const Header = () => {
  const [isSidebarShow, setIsSidebarShow] = useRecoilState(sidebarShow);
  const [isAsideShow, setAsideShow] = useRecoilState(asideShow);

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
        <HeaderAccountDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  );
};

export default memo(Header);
