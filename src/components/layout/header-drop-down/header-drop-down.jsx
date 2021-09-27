import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { user } from 'state/atoms';
import CIcon from '@coreui/icons-react';

const HeaderAccountDropdown = ({ logOut }) => {
  const [t] = useTranslation();
  const history = useHistory();
  const isUser = useRecoilValue(user);

  return (
    <>
      <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            <img
              src={isUser.photo}
              alt={t('header.alt')}
              className="header-nav-dropdown-menu-picture"
            />
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem onClick={() => history.push('/my-profile')}>
            <CIcon name="cil-user" className="mfe-2" />
            {t('header.profile')}
          </CDropdownItem>
          <CDropdownItem onClick={logOut}>
            <CIcon name="cil-account-logout" className="mfe-2" />
            {t('header.logout')}
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  );
};

export default HeaderAccountDropdown;
