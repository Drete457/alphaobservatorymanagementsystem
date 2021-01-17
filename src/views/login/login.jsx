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
import { useSetRecoilState } from 'recoil';
import { token, user } from '../../state/atoms';
import { firebase } from '../../api/';
import userConstrutor from '../../helpers/login';

const Login = () => {
  const history = useHistory();
  const [t] = useTranslation();

  const setToken = useSetRecoilState(token);
  const setUser = useSetRecoilState(user);

  console.log(process.env.REACT_APP_API_KEY);
  console.log(process.env.REACT_APP_AUTH_DOMAIN);
  console.log(process.env.REACT_APP_DATA_BASE_URL);
  console.log(process.env.REACT_APP_PROJECT_ID);
  console.log(process.env.REACT_APP_STORAGE_BUCKET);
  console.log(process.env.REACT_APP_MESSAGING_SENDER_ID);
  console.log(process.env.REACT_APP_ID);
  console.log(process.env.REACT_APP_MEASUREMENT_ID);
  const onSubmit = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const googleToken = result.credential.accessToken;
        const googleUser = result.user;
        const userInfo = userConstrutor(googleUser);

        setToken(googleToken);
        setUser(userInfo);

        history.push('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.mail;
        const credential = error.credential;
        console.log('error');
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
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
