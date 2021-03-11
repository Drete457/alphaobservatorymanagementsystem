import React from 'react';
import { useTranslation } from 'react-i18next';
import { CForm } from '@coreui/react';
import { InputField } from '../../input';
import View from '../../buttons/view';

const UserViewer = ({ user }) => {
  const [t] = useTranslation();
  const isDisabled = true;

  return (
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
              type="date"
              value={user?.community}
              className="user-input-format"
              disabled={isDisabled}
            />
          </div>

          <div className="user-input">
            <InputField
              title={t('user.fields.training.title')}
              name="training"
              type="date"
              value={user?.training}
              className="user-input-format"
              disabled={isDisabled}
            />

            <InputField
              title={t('user.fields.second.title')}
              name="second"
              type="date"
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
              type="date"
              value={user?.introductionDate}
              className="user-input-format"
              disabled={isDisabled}
            />
          </div>

          <div className="user-input">
            <InputField
              title={t('user.fields.survey.date.title')}
              name="surveyDate"
              type="date"
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

          <View user={user} />
        </CForm>
      </main>
    </>
  );
};

export default UserViewer;
