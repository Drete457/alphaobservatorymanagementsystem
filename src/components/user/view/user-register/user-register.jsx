import { useTranslation } from 'react-i18next';
import { CForm } from '@coreui/react';
import { SelectFieldComponent, InputField } from 'components/user/input';
import userHandler from 'helpers/user';

const UserRegister = ({
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
  //const reservation = user?.cards?.find?.((card) => card.reservation);

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
              title={t('user.fields.followed.title')}
              name="followed"
              placeholder={t('user.fields.followed.placeholder')}
              value={user?.followed}
              errorMsg={errorMsg?.followed}
              onChange={(value) => {
                userHandler.userSelectHandler('followed', value, setUser, user);
                setWasModified(true);
              }}
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
              onChange={(value) => {
                userHandler.userSelectHandler('country', value, setUser, user);
                setWasModified(true);
              }}
              options={countriesNames}
              className="user-input-format"
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
            {/*     <SelectFieldComponent
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
            /> */}

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
          </div>

          <div className="user-input">
            {/*    <InputField
              title={t('user.fields.training.title')}
              name="training"
              placeholder={t('user.fields.training.placeholder')}
              type="date"
              value={user?.training}
              errorMsg={errorMsg?.training}
              className="user-input-format"
              disabled
            /> */}

            <InputField
              title={t('user.fields.firstActivity.title')}
              name="firstActivity"
              placeholder={t('user.fields.firstActivity.placeholder')}
              type="date"
              value={user?.firstActivity}
              errorMsg={errorMsg?.firstActivity}
              onChange={(event) => {
                userHandler.userInputHandler(event, setUser, user);
                setWasModified(true);
              }}
              className="user-input-format"
            />

            <SelectFieldComponent
              title={t('user.fields.survey.type.title')}
              name="typeSurvey"
              placeholder={t('user.fields.survey.type.placeholder')}
              value={user?.typeSurvey}
              errorMsg={errorMsg?.typeSurvey}
              onChange={(value) => {
                userHandler.userSelectHandler(
                  'typeSurvey',
                  value,
                  setUser,
                  user,
                );
                setWasModified(true);
              }}
              options={genericList?.survey}
              className="user-input-format"
            />
          </div>

          {/*  <div className="user-input">
            <InputField
              title={t('user.fields.survey.link.title')}
              name="surveyLink"
              placeholder={t('user.fields.survey.link.placeholder')}
              type="url"
              value={user?.surveyLink}
              errorMsg={errorMsg?.surveyLink}
              onChange={(event) => {
                userHandler.userInputHandler(event, setUser, user);
                setWasModified(true);
              }}
              className="user-input-format"
            />

            <InputField
              title={t('user.fields.survey.friend.title')}
              name="surveyFriend"
              placeholder={t('user.fields.survey.friend.placeholder')}
              type="url"
              value={user?.surveyFriend}
              errorMsg={errorMsg?.surveyFriend}
              onChange={(event) => {
                userHandler.userInputHandler(event, setUser, user);
                setWasModified(true);
              }}
              className="user-input-format"
            />
          </div> */}

          {/*   <div className="user-input">
            <InputField
              title={t('user.fields.survey.face.title')}
              name="surveyFace"
              placeholder={t('user.fields.survey.face.placeholder')}
              type="url"
              value={user?.surveyFace}
              errorMsg={errorMsg?.surveyFace}
              onChange={(event) => {
                userHandler.userInputHandler(event, setUser, user);
                setWasModified(true);
              }}
              className="user-input-format"
            />

            <InputField
              title={t('user.fields.survey.date.title')}
              name="surveyDate"
              placeholder={t('user.fields.survey.date.placeholder')}
              type="date"
              value={user?.surveyDate}
              errorMsg={errorMsg?.surveyDate}
              onChange={(event) => {
                userHandler.userInputHandler(event, setUser, user);
                setWasModified(true);
              }}
              className="user-input-format"
            />
          </div> */}

          <div className="user-input">
            {/*  <InputField
              title={t('user.fields.cards.reservation')}
              name="reservation"
              type="date"
              value={reservation ? reservation.reservation : ''}
              className="user-input-format"
              disabled
            /> */}
          </div>
          {/*
          <div className="user-input">
            <SelectFieldComponent
              title={t('user.fields.introduction.option.title')}
              name="introductionOption"
              placeholder={t('user.fields.introduction.option.placeholder')}
              value={user?.introductionOption}
              errorMsg={errorMsg?.introductionOption}
              onChange={(value) => {
                setWasModified(true);
                userHandler.userSelectHandler(
                  'introductionOption',
                  value,
                  setUser,
                  user,
                );
              }}
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
              className="user-input-format"
              disabled
            />
          </div> */}

          <div className="user-input">
            {/*
            <InputField
              title={t('user.fields.second.title')}
              name="second"
              placeholder={t('user.fields.second.placeholder')}
              type="date"
              value={user?.second}
              errorMsg={errorMsg?.second}
              className="user-input-format"
              disabled
            /> */}
          </div>

          <div className="user-input">
            {/*  <InputField
              title={t('user.fields.ambit.title')}
              name="baseAmbit"
              type="date"
              value={user?.baseAmbit}
              errorMsg={errorMsg?.baseAmbit}
              onChange={(event) => {
                userHandler.userInputHandler(event, setUser, user);
                setWasModified(true);
              }}
              className="user-input-format"
            />

            <InputField
              title={t('user.fields.invitationAlphaCafe.title')}
              name="invitationAlphaCafe"
              type="date"
              value={user?.invitationAlphaCafe}
              errorMsg={errorMsg?.invitationAlphaCafe}
              className="user-input-format"
              disabled
            /> */}

            <div className="user-input">
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

              {/*   <InputField
                title={t('user.fields.community.title')}
                name="community"
                placeholder={t('user.fields.community.placeholder')}
                type="date"
                value={user?.community}
                errorMsg={errorMsg?.community}
                onChange={(event) => {
                  userHandler.userInputHandler(event, setUser, user);
                  setWasModified(true);
                }}
                className="user-input-format"
              /> */}
            </div>
          </div>
        </CForm>
      </main>
    </>
  );
};

export default UserRegister;
