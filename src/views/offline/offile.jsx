import { memo } from 'react';
import { CModal } from '@coreui/react';

const NoInternet = () => {
  return (
    <>
      <CModal show={true} centered size="lg">
        <img src="./images/nointernet.png" alt="Page Internet Detected" />
      </CModal>
    </>
  );
};

export default memo(NoInternet);
