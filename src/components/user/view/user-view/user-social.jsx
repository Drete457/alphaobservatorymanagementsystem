import { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm } from '@coreui/react';
import { InputField } from 'components/user/input';

const UserSocial = ({ user, socialList }) => {
  const [t] = useTranslation();
  const [social, setSocial] = useState('');

  useLayoutEffect(() => {
    if (user.social) {
      const userSocialList = user.social?.map(
        (social) => socialList.find((value) => value.id === social).name,
      );

      const socialNames = userSocialList.toString();
      const socialNamesWithSpace = socialNames.replaceAll(',', ', ');
      setSocial(socialNamesWithSpace);
    }
  }, [user, socialList]);

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
              disabled
            />
          </div>

          {Array.from(user.socialInfo)?.map((social) => {
            const socialMedia = socialList.find(
              (socialMedia) => socialMedia.id === social.id,
            );

            return (
              <div className="user-input" key={socialMedia.id}>
                <InputField
                  title={socialMedia.name}
                  name={socialMedia.id}
                  placeholder={t('user.fields.social.placeholdersocialnetwork')}
                  type="text"
                  value={social.name}
                  className="user-input-format"
                  disabled
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
