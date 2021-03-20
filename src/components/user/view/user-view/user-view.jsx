import { useTranslation } from 'react-i18next';
import { CForm } from '@coreui/react';
import { InputField } from '../../input';
import userHandler from '../../../../helpers/user';

const UserViewer = ({ user, countriesList, genericList, userList }) => {
  const [t] = useTranslation();
  const followedBy = userList.find((value) => value.id === user.followed)?.name;
  const contactBy = userList.find((value) => value.id === user.contacted)?.name;
  const country = countriesList.find((country) => country.id === user.country);
  const gender = genericList.gender.find((gender) => gender.id === user.gender);
  const employment = genericList.ocupation.find(
    (ocupation) => ocupation.id === user.employment,
  );
  const birthyear = genericList.years.find(
    (birthyear) => birthyear.id === user.birthyear,
  );
  const suitable = genericList.options.find(
    (options) => options.id === user.introductionOption,
  );

  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.view.title')}</h1>
      </header>

      <main className="main-body">
        <CForm>
          <div className="user-input">
            <InputField
              title={t('user.fields.name.title')}
              name="name"
              type="text"
              value={user?.name}
              className="user-input-format"
              disabled
            />

            <InputField
              title={t('user.fields.followed.title')}
              name="followed"
              type="text"
              value={followedBy}
              className="user-input-format"
              disabled
            />
          </div>

          <div className="user-input">
            <InputField
              title={t('user.fields.country.title')}
              name="country"
              type="text"
              value={userHandler.countryNameAndGmt(country)}
              className="user-input-format"
              disabled
            />

            <InputField
              title={t('user.fields.contacted.title')}
              name="contacted"
              type="text"
              value={contactBy}
              className="user-input-format"
              disabled
            />
          </div>

          <div className="user-input">
            <InputField
              title={t('user.fields.gender.title')}
              name="gender"
              type="text"
              value={gender?.name}
              className="user-input-format"
              disabled
            />

            <InputField
              title={t('user.fields.employment.title')}
              name="employment"
              type="text"
              value={employment?.name}
              className="user-input-format"
              disabled
            />
          </div>

          <div className="user-input">
            <InputField
              title={t('user.fields.birthyear.title')}
              name="birthyear"
              type="text"
              value={birthyear?.name}
              className="user-input-format"
              disabled
            />

            <InputField
              title={t('user.fields.community.title')}
              name="community"
              type={user?.community ? 'date' : 'text'}
              value={user?.community}
              className="user-input-format"
              disabled
            />
          </div>

          <div className="user-input">
            <InputField
              title={t('user.fields.training.title')}
              name="training"
              type={user?.community ? 'date' : 'text'}
              value={user?.training}
              className="user-input-format"
              disabled
            />

            <InputField
              title={t('user.fields.second.title')}
              name="second"
              type={user?.community ? 'date' : 'text'}
              value={user?.second}
              className="user-input-format"
              disabled
            />
          </div>

          <div className="user-input">
            <InputField
              title={t('user.fields.introduction.option.title')}
              name="introductionOption"
              type="text"
              value={suitable?.name}
              className="user-input-format"
              disabled
            />

            <InputField
              title={t('user.fields.introduction.date.title')}
              name="introductionDate"
              type={user?.community ? 'date' : 'text'}
              value={user?.introductionDate}
              className="user-input-format"
              disabled
            />
          </div>

          <div className="user-input">
            <InputField
              title={t('user.fields.survey.date.title')}
              name="surveyDate"
              type={user?.community ? 'date' : 'text'}
              value={user?.surveyDate}
              className="user-input-format"
              disabled
            />

            <InputField
              title={t('user.fields.survey.link.title')}
              name="surveyLink"
              type="text"
              value={user?.surveyLink}
              className="user-input-format"
              disabled
            />
          </div>
        </CForm>
      </main>
    </>
  );
};

export default UserViewer;
