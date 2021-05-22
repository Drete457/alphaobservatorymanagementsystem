import { CButton } from '@coreui/react';

const DeleteWarming = ({ deleteCard, setDeleteCardState, t }) => {
  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.registration.cards.delete')}</h1>
      </header>
      <div className="cards-button">
        <CButton
          shape="pill"
          variant="ghost"
          size="sm"
          color="danger"
          onClick={() => deleteCard()}
        >
          {t('btn.create-edit.cards.yes')}
        </CButton>
        <CButton
          shape="pill"
          variant="ghost"
          size="sm"
          color="primary"
          onClick={() => setDeleteCardState(false)}
        >
          {t('btn.create-edit.cards.no')}
        </CButton>
      </div>
    </>
  );
};

export default DeleteWarming;
