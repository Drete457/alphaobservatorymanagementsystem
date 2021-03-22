import { memo } from 'react';
import { CModal } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const NoInternet = () => {
  const [t] = useTranslation();
  const image = localStorage.getItem('offline');

  return (
    <CModal show={true} centered size="lg">
      <img src={image} alt={t('pages.nointernet')} />
    </CModal>
  );
};

export default memo(NoInternet);
