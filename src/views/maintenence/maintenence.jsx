import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react';
import { maintenanceImg } from 'assets/images';
import { useTranslation } from 'react-i18next';

const refreshPage = () => {
  window.location.reload();
};

const Maintenence = () => {
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
                    <h1 className="maintenance-title">
                      {t('pages.maintenance.title')}
                    </h1>
                    <img
                      src={maintenanceImg}
                      alt={t('pages.maintenance.title')}
                      className="center-maintenance"
                    />
                    <CButton
                      className="center-maintenance"
                      color="primary"
                      onClick={() => refreshPage()}
                    >
                      {t('btn.maintenance')}
                    </CButton>
                  </CCol>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Maintenence;
