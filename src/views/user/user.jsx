import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CTextarea,
  CRow,
  CInputCheckbox,
} from '@coreui/react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SelectFieldComponent, InputField } from '../../containers/user/input';

const UserDetail = ({ match }) => {
  const history = useHistory();
  const [t] = useTranslation();

  const [user, setUser] = useState({});
  const [errorMsg, setErrorMsg] = useState({});

  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.title')}</h1>
      </header>

      <main>
        <CForm>
          <InputField
            title={t('user.fields.name.title')}
            name="name"
            placeholder={t('user.fields.name.placeholder')}
            type="text"
            value={user?.name}
            errorMsg={errorMsg?.name}
            onChange={() => {}}
          />

          <SelectFieldComponent
            title={t('user.fields.followed.title')}
            name="followed"
            placeholder={t('user.fields.followed.placeholder')}
            value={user?.followed}
            errorMsg={errorMsg?.followed}
            onChange={() => {}}
            options=""
          />

          <SelectFieldComponent
            title={t('user.fields.country.title')}
            name="country"
            placeholder={t('user.fields.country.placeholder')}
            value={user?.country}
            errorMsg={errorMsg?.country}
            onChange={() => {}}
            options=""
          />

          <SelectFieldComponent
            title={t('user.fields.contacted.title')}
            name="contacted"
            placeholder={t('user.fields.contacted.placeholder')}
            value={user?.contacted}
            errorMsg={errorMsg?.contacted}
            onChange={() => {}}
            options=""
          />

          <SelectFieldComponent
            title={t('user.fields.gender.title')}
            name="gender"
            placeholder={t('user.fields.gender.placeholder')}
            value={user?.gender}
            errorMsg={errorMsg?.gender}
            onChange={() => {}}
            options=""
          />

          <SelectFieldComponent
            title={t('user.fields.employment.title')}
            name="employment"
            placeholder={t('user.fields.employment.placeholder')}
            value={user?.employment}
            errorMsg={errorMsg?.employment}
            onChange={() => {}}
            options=""
          />

          <InputField
            title={t('user.fields.birthday.title')}
            name="birthday"
            placeholder={t('user.fields.birthday.placeholder')}
            type="number"
            value={user?.birthday}
            errorMsg={errorMsg?.birthday}
            onChange={() => {}}
          />

          <InputField
            title={t('user.fields.training.title')}
            name="training"
            placeholder={t('user.fields.training.placeholder')}
            type="date"
            value={user?.training}
            errorMsg={errorMsg?.training}
            onChange={() => {}}
          />

          <InputField
            title={t('user.fields.second.title')}
            name="second"
            placeholder={t('user.fields.second.placeholder')}
            type="date"
            value={user?.second}
            errorMsg={errorMsg?.second}
            onChange={() => {}}
          />

          <InputField
            title={t('user.fields.introduction.option')}
            name="introductionOption"
            type="checkbox"
            value={user?.introductionOption}
            onChange={() => {}}
          />

          <InputField
            title={t('user.fields.introduction.date.title')}
            name="introductionDate"
            placeholder={t('user.fields.introduction.date.placeholder')}
            type="date"
            value={user?.introductionDate}
            errorMsg={errorMsg?.introductionDate}
            onChange={() => {}}
          />

          <InputField
            title={t('user.fields.community.title')}
            name="community"
            placeholder={t('user.fields.community.placeholder')}
            type="date"
            value={user?.community}
            errorMsg={errorMsg?.introductionDate}
            onChange={() => {}}
          />

          <InputField
            title={t('user.fields.survey.date.title')}
            name="surveyDate"
            placeholder={t('user.fields.survey.date.placeholder')}
            type="date"
            value={user?.surveyDate}
            errorMsg={errorMsg?.surveyDate}
            onChange={() => {}}
          />

          <InputField
            title={t('user.fields.survey.link.title')}
            name="surveyLink"
            placeholder={t('user.fields.survey.link.placeholder')}
            type="url"
            value={user?.surveyLink}
            errorMsg={errorMsg?.surveyLink}
            onChange={() => {}}
          />
        </CForm>
      </main>
    </>
  );
};

export default UserDetail;
