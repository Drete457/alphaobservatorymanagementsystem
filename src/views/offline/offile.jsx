import { memo } from 'react';
import { CModal } from '@coreui/react';

const NoInternet = () => {
  const image = localStorage.getItem('offline');

  return (
    <CModal show={true} centered size="lg">
      <img src={image} alt="No Internet Connection" />
    </CModal>
  );
};

export default memo(NoInternet);
