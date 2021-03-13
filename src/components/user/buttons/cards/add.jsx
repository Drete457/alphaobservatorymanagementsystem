import { CButton } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import CIcon from '@coreui/icons-react';

const ButtonCards = ({ setCardsArray, cardArray }) => {
  const [t] = useTranslation();

  return (
    <div className="cards-button">
      <CButton
        shape="pill"
        variant="ghost"
        size="md"
        color="primary"
        onClick={() => setCardsArray([{ title: '', body: '' }, ...cardArray])}
      >
        <CIcon name="cil-note-add" className="icon-style" />
        {' ' + t('btn.create-edit.cards')}
      </CButton>
    </div>
  );
};

export default ButtonCards;
