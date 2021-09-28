import { useLayoutEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { usePostError } from 'hooks/errors';
import Button from 'components/button';

const NotFound = ({ error, errorIn }) => {
  const [t] = useTranslation();
  const { execute } = usePostError();

  useLayoutEffect(() => {
    const errorBody = {
      code: error,
      message: errorIn,
    };

    execute(errorBody);
  }, [execute, error, errorIn]);

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="d-flex justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody md="12" className="page_404">
                  <div className="four_zero_four_bg">
                    <h1 className="text-center">404</h1>
                  </div>

                  <div className="contant_box_404">
                    <h2>{t('pages.notfound.lost')}</h2>

                    <p>{t('pages.notfound.page')}</p>

                    <Button
                      name={t('btn.notfound')}
                      onClick={() => (window.location.href = '/')}
                    />
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default NotFound;
