import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = ({ set }) => {
  const history = useHistory();
  const [t] = useTranslation();

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="d-flex justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody md="12" className="d-flex justify-content-center">
                  <CCol>
                    <h1>{t('login.title')}</h1>
                    <p className="text-muted">{t('login.signin')}</p>
                  </CCol>
                  <CRow>
                    <CCol>
                      <CButton
                        color="primary"
                        className="mt-4"
                        onClick={() => {
                          history.push('/');
                          set(true);
                        }}
                      >
                        {t('login.google_button')}
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
