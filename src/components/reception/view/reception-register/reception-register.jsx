import { useTranslation } from 'react-i18next';
import { CForm } from '@coreui/react';
import { SelectFieldComponent, InputField } from 'components/user/input';
import userHandler from 'helpers/user';

const ReceptionRegister = ({
  user,
  setUser,
  errorMsg,
  countriesList,
  genericList,
  userList,
  setWasModified,
  validName,
}) => {
  const [t] = useTranslation();
  const countriesNames = countriesList?.map((country) => {
    return { id: country.id, name: userHandler.countryNameAndGmt(country) };
  });

  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.registration.title')}</h1>
      </header>

      <main className="main-body">
        <CForm>
          <div className="user-input">
            <InputField
              title={t('user.fields.name.title')}
              name="name"
              placeholder={t('user.fields.name.placeholder')}
              type="text"
              value={user?.name}
              errorMsg={errorMsg?.name}
              onChange={(event) => {
                userHandler.userInputHandler(event, setUser, user);
                setWasModified(true);
              }}
              className="user-input-format"
              validName={validName}
            />

            <SelectFieldComponent
              title={t('user.fields.contacted.title')}
              name="contacted"
              placeholder={t('user.fields.contacted.placeholder')}
              value={user?.contacted}
              errorMsg={errorMsg?.contacted}
              onChange={(value) => {
                userHandler.userSelectHandler(
                  'contacted',
                  value,
                  setUser,
                  user,
                );
                setWasModified(true);
              }}
              options={userHandler.contactByFilter(userList)}
              className="user-input-format"
            />
          </div>

          <div className="user-input">
            <SelectFieldComponent
              title={t('user.fields.country.title')}
              name="country"
              placeholder={t('user.fields.country.placeholder')}
              value={user?.country}
              errorMsg={errorMsg?.country}
              onChange={(value) => {
                userHandler.userSelectHandler('country', value, setUser, user);
                setWasModified(true);
              }}
              options={countriesNames}
              className="user-input-format"
            />

            <SelectFieldComponent
              title={t('user.fields.birthyear.title')}
              name="birthyear"
              placeholder={t('user.fields.birthyear.placeholder')}
              value={user?.birthyear}
              errorMsg={errorMsg?.birthyear}
              onChange={(value) => {
                userHandler.userSelectHandler(
                  'birthyear',
                  value,
                  setUser,
                  user,
                );
                setWasModified(true);
              }}
              options={genericList?.years}
              className="user-input-format"
            />
          </div>

          <div className="user-input">
            <SelectFieldComponent
              title={t('user.fields.employment.title')}
              name="employment"
              placeholder={t('user.fields.employment.placeholder')}
              value={user?.employment}
              errorMsg={errorMsg?.employment}
              onChange={(value) => {
                userHandler.userSelectHandler(
                  'employment',
                  value,
                  setUser,
                  user,
                );
                setWasModified(true);
              }}
              options={genericList?.ocupation}
              className="user-input-format"
            />

            <SelectFieldComponent
              title={t('user.fields.gender.title')}
              name="gender"
              placeholder={t('user.fields.gender.placeholder')}
              value={user?.gender}
              errorMsg={errorMsg?.gender}
              onChange={(value) => {
                userHandler.userSelectHandler('gender', value, setUser, user);
                setWasModified(true);
              }}
              options={genericList?.gender}
              className="user-input-format"
            />
          </div>

          <div className="user-input">
            <SelectFieldComponent
              title={t('user.fields.personality.title')}
              name="personality"
              placeholder={t('user.fields.personality.placeholder')}
              value={user?.personality}
              errorMsg={errorMsg?.personality}
              onChange={(value) => {
                setWasModified(true);
                userHandler.userSelectHandler(
                  'personality',
                  value,
                  setUser,
                  user,
                );
              }}
              options={genericList?.personality}
              className="user-input-format"
            />
          </div>
        </CForm>
      </main>
    </>
  );
};

export default ReceptionRegister;
