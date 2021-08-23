import { CTabs, CNav, CNavItem, CNavLink } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const Tabs = ({ active, setActive }) => {
  const [t] = useTranslation();

  return (
    <>
      <CTabs activeTab={active} onActiveTabChange={(idx) => setActive(idx)}>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink>
              {t('pages.generic.activities-types')}
              {active === 0}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.card-types')}
              {active === 1}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.gender')}
              {active === 2}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.group-age')}
              {active === 3}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.ocupation')}
              {active === 4}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.options')}
              {active === 5}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.personality')}
              {active === 6}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.social-media')}
              {active === 7}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.years')}
              {active === 8}
            </CNavLink>
          </CNavItem>
        </CNav>
      </CTabs>
    </>
  );
};

export default Tabs;
