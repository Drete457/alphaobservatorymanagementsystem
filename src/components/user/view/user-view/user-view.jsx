import { useTranslation } from 'react-i18next';
import { CForm } from '@coreui/react';
import { InputField } from 'components/user/input';
import userHandler from 'helpers/user';

const UserViewer = ({ user, countriesList, genericList, userList }) => {
  const [t] = useTranslation();
  const followedBy = userList.find((value) => value.id === user.followed)?.name;
  const contactBy = userHandler
    .contactByFilter(userList)
    .find((value) => value.id === user.contacted)?.name;
  const country = countriesList.find((country) => country.id === user.country);
  const gender = genericList.gender.find((gender) => gender.id === user.gender);
  const employment = genericList.ocupation.find(
    (ocupation) => ocupation.id === user.employment,
  );
  const birthyear = genericList.years.find(
    (birthyear) => birthyear.id === user.birthyear,
  );
  /*   const suitable = genericList.options.find(
    (options) => options.id === user.introductionOption,
  );
  const personality = genericList.personality.find(
    (options) => options.id === user.personality,
  );
  const reservation = user?.cards?.find?.((card) => card.reservation);*/
  const typeSurvey = genericList.survey.find(
    (options) => options.id === user?.typeSurvey,
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
            {/*   <InputField
              title={t('user.fields.personality.title')}
              name="personality"
              type="text"
              value={personality?.name}
              className="user-input-format"
              disabled
            /> */}

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
            {/*   <InputField
              title={t('user.fields.training.title')}
              name="training"
              type="date"
              value={user?.training}
              className="user-input-format"
              disabled
            /> */}

            <InputField
              title={t('user.fields.firstActivity.title')}
              name="firstActivity"
              type="date"
              value={user?.firstActivity}
              className="user-input-format"
              disabled
            />

            <InputField
              title={t('user.fields.survey.type.title')}
              name="typeSurvey"
              type="date"
              value={typeSurvey?.name}
              className="user-input-format"
              disabled
            />
          </div>

          {/* <div className="user-input">
            <InputField
              title={t('user.fields.survey.link.title')}
              name="surveyLink"
              type="text"
              value={user?.surveyLink}
              className="user-input-format"
              disabled
            />

            <InputField
              title={t('user.fields.survey.friend.title')}
              name="surveyFriend"
              type="text"
              value={user?.surveyFriend}
              className="user-input-format"
              disabled
            />
          </div> */}

          {/*           <div className="user-input">
            <InputField
              title={t('user.fields.survey.face.title')}
              name="surveyFace"
              type="text"
              value={user?.surveyFace}
              className="user-input-format"
              disabled
            />

            <InputField
              title={t('user.fields.survey.date.title')}
              name="surveyDate"
              type="date"
              value={user?.surveyDate}
              className="user-input-format"
              disabled
            />
          </div> */}

          <div className="user-input">
            {/*     <InputField
              title={t('user.fields.cards.reservation')}
              name="reservation"
              type="text"
              value={reservation ? reservation.reservation : ''}
              className="user-input-format"
              disabled
            /> */}
          </div>

          {/*  <div className="user-input">
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
              type="date"
              value={user?.introductionDate}
              className="user-input-format"
              disabled
            />
          </div> */}

          <div className="user-input">
            <InputField
              title={t('user.fields.birthyear.title')}
              name="birthyear"
              type="text"
              value={birthyear?.name}
              className="user-input-format"
              disabled
            />

            {/*   <InputField
              title={t('user.fields.second.title')}
              name="second"
              type="date"
              value={user?.second}
              className="user-input-format"
              disabled
            /> */}
          </div>
          {/*
          <div className="user-input">
            <InputField
              title={t('user.fields.ambit.title')}
              name="baseAmbit"
              type="date"
              value={user?.baseAmbit}
              className="user-input-format"
              disabled
            />

            <InputField
              title={t('user.fields.invitationAlphaCafe.title')}
              name="invitationAlphaCafe"
              type="date"
              value={user?.invitationAlphaCafe}
              className="user-input-format"
              disabled
            />
          </div> */}

          <div className="user-input">
            {/* <InputField
              title={t('user.fields.community.title')}
              name="community"
              type="date"
              value={user?.community}
              className="user-input-format"
              disabled
            /> */}
          </div>
        </CForm>
      </main>
    </>
  );
};

export default UserViewer;
