import React, { memo, useState } from 'react';
import { CRow, CModal, CSpinner } from '@coreui/react';

const Loading = () => {
  const [modal, setModal] = useState(true);
  return (
    <>
      <CModal show={modal} onClose={setModal} centered size="sm">
        <CRow md="12" className="d-flex flex-row justify-content-center">
          <CSpinner
            size="xl"
            style={{
              width: '4rem',
              height: '4rem',
            }}
            color="primary"
            variant="grow"
          />
        </CRow>
      </CModal>
    </>
  );
};

export default memo(Loading);
