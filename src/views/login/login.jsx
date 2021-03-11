import React, { useState } from 'react';
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
import { useSetRecoilState } from 'recoil';
import { user, api } from '../../state/atoms';
import { firebase } from '../../api/';
import userConstrutor from '../../helpers/login';

const Login = () => {
  const history = useHistory();
  const [t] = useTranslation();
  const [error, setError] = useState({
    code: '',
    message: '',
    email: '',
    credential: '',
  });

  const setUser = useSetRecoilState(user);
  const setCommunicationSystem = useSetRecoilState(api);

  const onSubmit = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const googleUser = result.user;
        const userInfo = userConstrutor(googleUser);

        setUser(userInfo);
        setCommunicationSystem(firebase);

        history.push('/users');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.mail;
        const credential = error.credential;

        setError({
          code: errorCode,
          message: errorMessage,
          email: email,
          credential: credential,
        });
      });
  };

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
                          onSubmit();
                        }}
                      >
                        {t('btn.login.google_button')}
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCardGroup>
            {error.code && (
              <CCard className="p-4">
                <CCardBody md="12" className="d-flex justify-content-center">
                  <CCol>
                    <h1>Error</h1>
                    <p>Code: {error.code}</p>
                    <p>Message: {error.message}</p>
                    <p>User: {error.email}</p>
                    <p>Credential: {error.credential}</p>
                  </CCol>
                </CCardBody>
              </CCard>
            )}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
