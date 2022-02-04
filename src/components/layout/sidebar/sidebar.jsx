import { memo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sidebarShow, users, user } from 'state/atoms';
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import homeHandler from 'helpers/users';

// sidebar nav config
import useNavigation from './navigation';

const Sidebar = () => {
  const [isSidebarShow, setIsSidebarShow] = useRecoilState(sidebarShow);
  const [t] = useTranslation();

  let hashPass = '';

  const { collaborators } = useRecoilValue(users);
  const isUser = useRecoilValue(user);

  if (collaborators) {
    const hashCompare = Array.from(collaborators).find(
      (item) => item.hashcode,
    ).hashcode;

    hashPass = homeHandler.hashCode(isUser?.email).toString() === hashCompare;
  }

  return (
    <CSidebar
      show={isSidebarShow}
      unfoldable
      onShowChange={(val) => setIsSidebarShow(val)}
    >
      <CSidebarNav>
        <CSidebarNavTitle>Dashboard</CSidebarNavTitle>
        <CCreateElement
          items={useNavigation(t, hashPass)}
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
