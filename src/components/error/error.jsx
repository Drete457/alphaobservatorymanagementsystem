import { useLayoutEffect } from 'react';
import { CCard, CCardBody, CCol } from '@coreui/react';
import { usePostError } from 'hooks/errors';

const ErrorInfo = ({ error }) => {
  const { execute } = usePostError();

  //send error log to the server
  useLayoutEffect(() => {
    execute(error);
  }, [execute, error]);

  return (
    <>
      <CCard className="p-4">
        <CCardBody md="12" className="d-flex justify-content-center">
          <CCol>
            <h1>Error</h1>
            <p>Code: {error?.code}</p>
            <p>Message: {error?.message}</p>
            <p>User: {error?.email}</p>
            <p>Credential: {error?.credential}</p>
          </CCol>
        </CCardBody>
      </CCard>
    </>
  );
};

export default ErrorInfo;
