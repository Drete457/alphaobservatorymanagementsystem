import React, { useState, useLayoutEffect } from 'react';
import { CForm } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import {
  SelectFieldComponent,
  InputField,
} from '../../../containers/user/input';
import { useGetCountries } from '../../../hooks/countries';
import { useGetSocial } from '../../../hooks/social';
import userHandler from '../../../helpers/user';
import uniqueId from '../../../helpers/id-generator';
import Submit from '../../../containers/user/submit';
import ErrorInfo from '../../../containers/error';
import Loading from '../../../containers/loading';

const UserRegistration = () => {
  const [t] = useTranslation();

  const [user, setUser] = useState({ ...userHandler.userFormat });
  const [countriesList, setCountriesList] = useState([]);
  const [social, setSocial] = useState([]);
  const [errorMsg, setErrorMsg] = useState({ ...userHandler.userFormat });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const {
    isLoading: isLoadingCountries,
    error: errorCountries,
    data: countries,
    execute: executeCountries,
  } = useGetCountries();
  const {
    isLoading: isLoadingSocial,
    error: errorSocial,
    data: socialList,
    execute: executeSocial,
  } = useGetSocial();

  useLayoutEffect(() => {
    const user = { ...userHandler.userFormat };
    user.id = uniqueId();

    setUser(user);
  }, []);

  useLayoutEffect(() => {
    executeCountries();
    executeSocial();
  }, [executeCountries, executeSocial]);

  useLayoutEffect(() => {
    if (countries) {
      const filterCountriesList = Array.from(countries).map(
        (value) => value.country,
      );
      setCountriesList(filterCountriesList);
    }

    if (socialList) {
      const filterSocialList = Object.values(socialList);

      setSocial(filterSocialList);
    }
  }, [countries, socialList]);

  useLayoutEffect(() => {
    const errorInfo = errorCountries || errorSocial;

    if (errorInfo) {
      setError(errorInfo);
    }
  }, [errorCountries, errorSocial]);

  useLayoutEffect(() => {
    const loadingInfo = isLoadingCountries || isLoadingSocial;

    if (loadingInfo) {
      setLoading(loadingInfo);
    }
  }, [isLoadingCountries, isLoadingSocial]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <>
          <header>
            <h1 className="title">{t('pages.user.registration.title')}</h1>
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
                  errorMsg={errorMsg?.country}
                  onChange={(value) =>
                    userHandler.userSelectHandler(
                      'country',
                      value,
                      setUser,
                      user,
                    )
                  }
                  options={countriesList}
                  className="user-input-format"
                />

                <SelectFieldComponent
                  title={t('user.fields.contacted.title')}
                  name="contacted"
                  placeholder={t('user.fields.contacted.placeholder')}
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
                  errorMsg={errorMsg?.gender}
                  onChange={(value) =>
                    userHandler.userSelectHandler(
                      'gender',
                      value,
                      setUser,
                      user,
                    )
                  }
                  options={userHandler.gender()}
                  className="user-input-format"
                />

                <SelectFieldComponent
                  title={t('user.fields.employment.title')}
                  name="employment"
                  placeholder={t('user.fields.employment.placeholder')}
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
                  name="birthyear"
                  placeholder={t('user.fields.birthyear.placeholder')}
                  errorMsg={errorMsg?.birthyear}
                  onChange={(value) =>
                    userHandler.userSelectHandler(
                      'birthyear',
                      value,
                      setUser,
                      user,
                    )
                  }
                  options={userHandler.years()}
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

              <Submit
                cancelPage="/"
                user={user}
                setErrorMsg={setErrorMsg}
                setError={setError}
              />
            </CForm>
          </main>
        </>
      )}
      {loading && <Loading />}
    </>
  );
};

export default UserRegistration;
