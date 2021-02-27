import React, { useState, useEffect } from 'react';
import { CForm } from '@coreui/react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  SelectFieldComponent,
  InputField,
} from '../../../containers/user/input';
import userHandler from '../../../helpers/user';

const UserDetail = ({ match }) => {
  const history = useHistory();
  const [t] = useTranslation();

  const [user, setUser] = useState({ ...userHandler.userFormat });
  const [errorMsg, setErrorMsg] = useState({ ...userHandler.userFormat });

  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.title')}</h1>
      </header>

      <main className="registration-body">
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
              value={user?.followed}
              errorMsg={errorMsg?.followed}
              onChange={() => {}}
              options=""
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
              options={userHandler.countries()}
              className="user-input-format"
            />

            <SelectFieldComponent
              title={t('user.fields.contacted.title')}
              name="contacted"
              placeholder={t('user.fields.contacted.placeholder')}
              value={user?.contacted}
              errorMsg={errorMsg?.contacted}
              onChange={() => {}}
              options=""
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
              options={userHandler.gender()}
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
              options={userHandler.ocupation()}
              className="user-input-format"
            />
          </div>

          <div className="user-input">
            <SelectFieldComponent
              title={t('user.fields.birthyear.title')}
              name="birtyhear"
              placeholder={t('user.fields.birthyear.placeholder')}
              value={user?.birthday}
              errorMsg={errorMsg?.birthday}
              onChange={(value) =>
                userHandler.userSelectHandler('birthyear', value, setUser, user)
              }
              options={userHandler.years()}
              className="user-input-format"
            />

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
          </div>

          <div className="user-input">
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
              options={userHandler.option()}
              className="user-input-format"
            />
          </div>

          <div className="user-input">
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

            <InputField
              title={t('user.fields.community.title')}
              name="community"
              placeholder={t('user.fields.community.placeholder')}
              type="date"
              value={user?.community}
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

export default UserDetail;
