import { CButton } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import CIcon from '@coreui/icons-react';
import dateGenerator from 'helpers/date-generator';

const ButtonCards = ({ setCardsArray, cardArray, cardsLimit }) => {
  const [t] = useTranslation();

  return (
    <div className="cards-button">
      <CButton
        shape="pill"
        variant="ghost"
        size="md"
        color="primary"
        onClick={() => {
          const newDate = dateGenerator();

          setCardsArray([
            { body: '', date: newDate, trainer: '' },
            ...cardArray,
          ]);
        }}
        disabled={cardArray.length < cardsLimit ? false : true}
      >
        <CIcon name="cil-note-add" />
        {' ' + t('btn.create-edit.cards.add')}
      </CButton>
    </div>
  );
};

export default ButtonCards;
