import { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { user } from 'state/atoms';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import userConstrutor from 'helpers/login';

const onSubmit = async (setUser, setError) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const googleUser = result.user;
      const userInfo = userConstrutor(googleUser);

      setUser(userInfo);
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

const Login = () => {
  const [t] = useTranslation();
  const [error, setError] = useState({
    code: '',
    message: '',
    email: '',
    credential: '',
  });

  const setUser = useSetRecoilState(user);

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="d-flex justify-content-center">
          <CCard className="p-4">
            <CCardHeader className="text-center">
              <h1>{t('login.title')}</h1>
              <p className="text-muted">{t('login.signin')}</p>
            </CCardHeader>
            <CCardBody className="d-flex justify-content-center">
              <CButton
                color="primary"
                className="mt-4"
                onClick={() => {
                  onSubmit(setUser, setError);
                }}
              >
                {t('btn.login.google-button')}
              </CButton>
            </CCardBody>
          </CCard>

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
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
