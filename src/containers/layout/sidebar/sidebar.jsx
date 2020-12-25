import React, { memo } from 'react';
import { useRecoilState } from 'recoil';
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react';

import { sidebarShow } from '../../../state/atoms';

// sidebar nav config
import useNavigation from './navigation';

const Sidebar = () => {
  const [isSidebarShow, setIsSidebarShow] = useRecoilState(sidebarShow);

  return (
    <CSidebar
      show={isSidebarShow}
      unfoldable
      onShowChange={(val) => setIsSidebarShow(val)}
    >
      <CSidebarNav>
        <CSidebarNavTitle>Dashboard</CSidebarNavTitle>
        <CCreateElement
          items={useNavigation()}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
    </CSidebar>
  );
};

export default memo(Sidebar);
