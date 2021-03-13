import { useTranslation } from 'react-i18next';
import { CForm } from '@coreui/react';
import { SelectFieldComponent, InputField } from '../../input';
import userHandler from '../../../../helpers/user';

const UserSocial = ({ socialList, user, setUser, errorMsg }) => {
  const [t] = useTranslation();
  console.log(socialList);
  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.registration.social.title')}</h1>
      </header>

      <main className="main-body">
        <CForm>
          <div className="user-input">
            <SelectFieldComponent
              title={t('user.fields.social.title')}
              name="social"
              placeholder={t('user.fields.social.placeholder')}
              onChange={(value) =>
                userHandler.userSocialSelectHandler(
                  'social',
                  value,
                  setUser,
                  user,
                )
              }
              options={socialList}
              className="user-input-format"
              isMulti={true}
            />
          </div>

          {Array.from(user.socialInfo).map((social, index) => {
            return (
              <div className="user-input" key={social.title}>
                <InputField
                  title={social.title}
                  name={social.title}
                  placeholder={t('user.fields.social.placeholdersocialnetwork')}
                  type="text"
                  value={social.name}
                  errorMsg={!social.name ? errorMsg?.socialInfo : ''}
                  onChange={(event) => {
                    userHandler.userSocialInfoHandler(
                      'socialInfo',
                      event,
                      setUser,
                      user,
                      index,
                    );
                  }}
                  className="user-input-format"
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
