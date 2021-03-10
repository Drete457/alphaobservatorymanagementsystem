import React, { useState, useEffect } from 'react';
import { CForm } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { InputField } from '../../../containers/user/input';
import { useGetUser } from '../../../hooks/users';
import ErrorInfo from '../../../containers/error';
import Loading from '../../../containers/loading';
import View from '../../../containers/user/view';

const UserView = ({ match }) => {
  const [t] = useTranslation();
  const [user, setUser] = useState({});
  const isDisabled = true;

  const { isLoading, error, data, execute } = useGetUser();

  useEffect(() => {
    const userID = match.params.id;
    execute(userID);
  }, [execute, match]);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <>
          <header>
            <h1 className="title">{t('pages.user.view.title')}</h1>
          </header>

          <main className="registration-body">
            <CForm>
              <div className="user-input">
                <InputField
                  title={t('user.fields.name.title')}
                  name="name"
                  type="text"
                  value={user?.name}
                  className="user-input-format"
                  disabled={isDisabled}
                />

                <InputField
                  title={t('user.fields.followed.title')}
                  name="followed"
                  type="text"
                  value={user?.followed}
                  className="user-input-format"
                  disabled={isDisabled}
                />
              </div>

              <div className="user-input">
                <InputField
                  title={t('user.fields.country.title')}
                  name="country"
                  type="text"
                  value={user?.country}
                  className="user-input-format"
                  disabled={isDisabled}
                />

                <InputField
                  title={t('user.fields.contacted.title')}
                  name="contacted"
                  type="text"
                  value={user?.contacted}
                  className="user-input-format"
                  disabled={isDisabled}
                />
              </div>

              <div className="user-input">
                <InputField
                  title={t('user.fields.gender.title')}
                  name="gender"
                  type="text"
                  value={user?.gender}
                  className="user-input-format"
                  disabled={isDisabled}
                />

                <InputField
                  title={t('user.fields.employment.title')}
                  name="employment"
                  type="text"
                  value={user?.employment}
                  className="user-input-format"
                  disabled={isDisabled}
                />
              </div>

              <div className="user-input">
                <InputField
                  title={t('user.fields.birthyear.title')}
                  name="birthyear"
                  type="text"
                  value={user?.birthyear}
                  className="user-input-format"
                  disabled={isDisabled}
                />

                <InputField
                  title={t('user.fields.community.title')}
                  name="community"
                  type="text"
                  value={user?.community}
                  className="user-input-format"
                  disabled={isDisabled}
                />
              </div>

              <div className="user-input">
                <InputField
                  title={t('user.fields.training.title')}
                  name="training"
                  type="text"
                  value={user?.training}
                  className="user-input-format"
                  disabled={isDisabled}
                />

                <InputField
                  title={t('user.fields.second.title')}
                  name="second"
                  type="text"
                  value={user?.second}
                  className="user-input-format"
                  disabled={isDisabled}
                />
              </div>

              <div className="user-input">
                <InputField
                  title={t('user.fields.introduction.option.title')}
                  name="introductionOption"
                  type="text"
                  value={user?.introductionOption}
                  className="user-input-format"
                  disabled={isDisabled}
                />

                <InputField
                  title={t('user.fields.introduction.date.title')}
                  name="introductionDate"
                  type="text"
                  value={user?.introductionDate}
                  className="user-input-format"
                  disabled={isDisabled}
                />
              </div>

              <div className="user-input">
                <InputField
                  title={t('user.fields.survey.date.title')}
                  name="surveyDate"
                  type="text"
                  value={user?.surveyDate}
                  className="user-input-format"
                  disabled={isDisabled}
                />

                <InputField
                  title={t('user.fields.survey.link.title')}
                  name="surveyLink"
                  type="text"
                  value={user?.surveyLink}
                  className="user-input-format"
                  disabled={isDisabled}
                />
              </div>

              <View cancelPage="/" user={user} />
            </CForm>
          </main>
        </>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default UserView;
