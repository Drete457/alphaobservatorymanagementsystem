import { CButton } from '@coreui/react';
import { deleteF } from 'hooks/files/delete';
import { useDeleteReceptionCard } from 'hooks/reception';

const DeleteReceptionWarming = ({ t, id, setDelete, setChange }) => {
  const { execute: deleteEntry } = useDeleteReceptionCard();
  const { execute: executeDelete } = deleteF();

  return (
    <>
      <header>
        <h1 className="title">{t('pages.reception.delete')}</h1>
      </header>
      <div className="cards-button">
        <CButton
          shape="pill"
          variant="ghost"
          size="sm"
          color="danger"
          onClick={() => {
            const ref = 'profile/' + id + '.pdf';
            executeDelete(ref);
            deleteEntry(id);
            setChange(id);
          }}
        >
          {t('btn.create-edit.cards.yes')}
        </CButton>
        <CButton
          shape="pill"
          variant="ghost"
          size="sm"
          color="primary"
          onClick={() => setDelete(false)}
        >
          {t('btn.create-edit.cards.no')}
        </CButton>
      </div>
    </>
  );
};

export default DeleteReceptionWarming;
