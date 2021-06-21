import { CCol, CRow } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { user } from 'state/atoms';
import InputDetailView from 'components/my-profile';

const MyProfile = () => {
  const [t] = useTranslation();
  const isUser = useRecoilValue(user);

  return (
    <>
      <main>
        <CRow className="ml-3">
          <h1 className="title">{t('pages.myprofile.title')}</h1>
        </CRow>

        <CRow className="ml-3 mt-3">
          <CCol md="2">
            <img
              src={isUser.photo}
              alt={t('header.alt')}
              className="profile-page-image"
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
      </main>
    </>
  );
};

export default MyProfile;
