import React from 'react';
import { CCol, CRow } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { user } from '../../state/atoms';
import { Avatar } from '@agney/react-avatar';

import InputDetailView from '../../containers/my-profile';

const MyProfile = () => {
  const [t] = useTranslation();
  const isUser = useRecoilValue(user);

  return (
    <>
      <CRow className="ml-3">
        <p className="h1 pl-3">{t('pages.myprofile.title')}</p>
      </CRow>

      <CRow className="ml-3 mt-3">
        <CCol md="2">
          <Avatar
            src={isUser.photo}
            backgrounds={['#FFFFFF']}
            htmlWidth="150px"
            className="border border-primary d-flex display-3"
          />
        </CCol>
        <CCol md="8">
          <InputDetailView
            title1={t('pages.myprofile.name')}
            value1={isUser.name}
            title2={t('pages.myprofile.email')}
            value2={isUser.email}
            md="6"
          />

          <InputDetailView
            title1={t('pages.myprofile.create')}
            value1={isUser.create}
            title2={t('pages.myprofile.last')}
            value2={isUser.last}
            md="6"
          />
        </CCol>
      </CRow>
    </>
  );
};

export default MyProfile;
