import { CButton } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import CIcon from '@coreui/icons-react';

const ButtonCards = ({ setCardsArray, cardArray, setEdit, edit }) => {
  const [t] = useTranslation();

  return (
    <div className="cards-button">
      {!cardArray.length < 1 && (
        <CButton
          shape="pill"
          variant={edit ? '' : 'ghost'}
          size="md"
          color="primary"
          onClick={() => setEdit(!edit)}
        >
          <CIcon name={edit ? 'cil-save' : 'cil-pencil'} />
          {edit
            ? ' ' + t('btn.create-edit.cards.save')
            : ' ' + t('btn.create-edit.cards.edit')}
        </CButton>
      )}
      <CButton
        shape="pill"
        variant="ghost"
        size="md"
        color="primary"
        onClick={() => setCardsArray([{ title: '', body: '' }, ...cardArray])}
      >
        <CIcon name="cil-note-add" />
        {' ' + t('btn.create-edit.cards.add')}
      </CButton>
    </div>
  );
};

export default ButtonCards;
