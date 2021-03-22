import { CTabs, CNav, CNavItem, CNavLink } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import CIcon from '@coreui/icons-react';

const Tabs = ({ active, setActive }) => {
  const [t] = useTranslation();

  return (
    <>
      <CTabs activeTab={active} onActiveTabChange={(idx) => setActive(idx)}>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink>
              <CIcon name="cil-user" />
              {active === 0 && ' ' + t('pages.user.tabs.user')}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              <CIcon name="cil-contact" />
              {active === 1 && ' ' + t('pages.user.tabs.social')}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              <CIcon name="cil-notes" />
              {active === 2 && ' ' + t('pages.user.tabs.cards')}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              <CIcon name="cil-contact" />
              {active === 3 && ' ' + t('pages.user.tabs.profile')}
            </CNavLink>
          </CNavItem>
        </CNav>
      </CTabs>
    </>
  );
};

export default Tabs;
