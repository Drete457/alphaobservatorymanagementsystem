import { useTranslation } from 'react-i18next';
import { CForm } from '@coreui/react';
import { SelectFieldComponent, InputField } from '../../input';
import userHandler from '../../../../helpers/user';

const UserRegister = ({
  user,
  setUser,
  errorMsg,
  countriesList,
  genericList,
  userList,
}) => {
  const [t] = useTranslation();
  const countriesNames = countriesList.map((country) => {
    return { id: country.id, name: userHandler.countryNameAndGmt(country) };
  });
  console.log(user);
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
              onChange={(event) =>
                userHandler.userInputHandler(event, setUser, user)
              }
              className="user-input-format"
            />

            <SelectFieldComponent
              title={t('user.fields.followed.title')}
              name="followed"
              placeholder={t('user.fields.followed.placeholder')}
              errorMsg={errorMsg?.followed}
              onChange={(value) =>
                userHandler.userSelectHandler('followed', value, setUser, user)
              }
              options={userList}
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
              onChange={(value) =>
                userHandler.userSelectHandler('country', value, setUser, user)
              }
              options={countriesNames}
              className="user-input-format"
            />

            <SelectFieldComponent
              title={t('user.fields.contacted.title')}
              name="contacted"
              placeholder={t('user.fields.contacted.placeholder')}
              errorMsg={errorMsg?.contacted}
              onChange={(value) =>
                userHandler.userSelectHandler('contacted', value, setUser, user)
              }
              options={userList}
              className="user-input-format"
            />
          </div>

          <div className="user-input">
            <SelectFieldComponent
              title={t('user.fields.gender.title')}
              name="gender"
              placeholder={t('user.fields.gender.placeholder')}
              value={user?.gender}
              errorMsg={errorMsg?.gender}
              onChange={(value) =>
                userHandler.userSelectHandler('gender', value, setUser, user)
              }
              options={genericList?.gender}
              className="user-input-format"
            />

            <SelectFieldComponent
              title={t('user.fields.employment.title')}
              name="employment"
              placeholder={t('user.fields.employment.placeholder')}
              value={user?.employment}
              errorMsg={errorMsg?.employment}
              onChange={(value) =>
                userHandler.userSelectHandler(
                  'employment',
                  value,
                  setUser,
                  user,
                )
              }
              options={genericList?.ocupation}
              className="user-input-format"
            />
          </div>

          <div className="user-input">
            <SelectFieldComponent
              title={t('user.fields.birthyear.title')}
              name="birthyear"
              placeholder={t('user.fields.birthyear.placeholder')}
              value={user?.birthyear}
              errorMsg={errorMsg?.birthyear}
              onChange={(value) =>
                userHandler.userSelectHandler('birthyear', value, setUser, user)
              }
              options={genericList?.years}
              className="user-input-format"
            />

            <InputField
              title={t('user.fields.community.title')}
              name="community"
              placeholder={t('user.fields.community.placeholder')}
              type="date"
              value={user?.community}
              errorMsg={errorMsg?.community}
              onChange={(event) =>
                userHandler.userInputHandler(event, setUser, user)
              }
              className="user-input-format"
            />
          </div>

          <div className="user-input">
            <InputField
              title={t('user.fields.training.title')}
              name="training"
              placeholder={t('user.fields.training.placeholder')}
              type="date"
              value={user?.training}
              errorMsg={errorMsg?.training}
              onChange={(event) =>
                userHandler.userInputHandler(event, setUser, user)
              }
              className="user-input-format"
            />

            <InputField
              title={t('user.fields.second.title')}
              name="second"
              placeholder={t('user.fields.second.placeholder')}
              type="date"
              value={user?.second}
              errorMsg={errorMsg?.second}
              onChange={(event) =>
                userHandler.userInputHandler(event, setUser, user)
              }
              className="user-input-format"
            />
          </div>

          <div className="user-input">
            <SelectFieldComponent
              title={t('user.fields.introduction.option.title')}
              name="introductionOption"
              placeholder={t('user.fields.introduction.option.placeholder')}
              value={user?.introductionOption}
              errorMsg={errorMsg?.introductionOption}
              onChange={(value) =>
                userHandler.userSelectHandler(
                  'introductionOption',
                  value,
                  setUser,
                  user,
                )
              }
              options={genericList?.options}
              className="user-input-format"
            />

            <InputField
              title={t('user.fields.introduction.date.title')}
              name="introductionDate"
              placeholder={t('user.fields.introduction.date.placeholder')}
              type="date"
              value={user?.introductionDate}
              errorMsg={errorMsg?.introductionDate}
              onChange={(event) =>
                userHandler.userInputHandler(event, setUser, user)
              }
              className="user-input-format"
            />
          </div>

          <div className="user-input">
            <InputField
              title={t('user.fields.survey.date.title')}
              name="surveyDate"
              placeholder={t('user.fields.survey.date.placeholder')}
              type="date"
              value={user?.surveyDate}
              errorMsg={errorMsg?.surveyDate}
              onChange={(event) =>
                userHandler.userInputHandler(event, setUser, user)
              }
              className="user-input-format"
            />

            <InputField
              title={t('user.fields.survey.link.title')}
              name="surveyLink"
              placeholder={t('user.fields.survey.link.placeholder')}
              type="url"
              value={user?.surveyLink}
              errorMsg={errorMsg?.surveyLink}
              onChange={(event) =>
                userHandler.userInputHandler(event, setUser, user)
              }
              className="user-input-format"
            />
          </div>
        </CForm>
      </main>
    </>
  );
};

export default UserRegister;
