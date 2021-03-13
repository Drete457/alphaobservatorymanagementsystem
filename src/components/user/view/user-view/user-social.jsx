import { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm } from '@coreui/react';
import { InputField } from '../../input';

const UserSocial = ({ user }) => {
  const [t] = useTranslation();
  const [social, setSocial] = useState('');
  const [socialInfo, setSocialInfo] = useState([]);
  const isDisabled = true;

  useLayoutEffect(() => {
    if (user.social) {
      const socialNames = Array.from(user.social).toString();
      const socialNamesWithSpace = socialNames.replaceAll(',', ', ');
      setSocial(socialNamesWithSpace);
    }
    if (user.socialInfo) {
      setSocialInfo(Array.from(user.socialInfo));
    }
  }, [user]);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.view.social.title')}</h1>
      </header>

      <main className="main-body">
        <CForm>
          <div className="user-input">
            <InputField
              title={t('user.fields.social.title')}
              name="social"
              type="text"
              value={social}
              className="user-input-format"
              disabled={isDisabled}
            />
          </div>

          {Array.from(socialInfo).map((social) => {
            return (
              <div className="user-input" key={social.title}>
                <InputField
                  title={social.title}
                  name={social.title}
                  type="text"
                  value={social.name}
                  className="user-input-format"
                  disabled={isDisabled}
                />
              </div>
            );
          })}
        </CForm>
      </main>
    </>
  );
};

export default UserSocial;
