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
              {t('pages.generic.activities-types.tab')}
              {active === 0}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.card-types.tab')}
              {active === 1}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.gender.tab')}
              {active === 2}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.group-age.tab')}
              {active === 3}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.ocupation.tab')}
              {active === 4}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.options.tab')}
              {active === 5}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.personality.tab')}
              {active === 6}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.social-media.tab')}
              {active === 7}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              {t('pages.generic.years.tab')}
              {active === 8}
            </CNavLink>
          </CNavItem>
        </CNav>
      </CTabs>
    </>
  );
};

export default Tabs;
