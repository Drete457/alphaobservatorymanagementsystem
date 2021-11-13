import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CDataTable, CRow, CModal } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Button from 'components/button/button';
import receptionHandler from 'helpers/repection';
import homeHandler from 'helpers/users';
import CIcon from '@coreui/icons-react';

const DataTable = ({
  entries,
  isLoading,
  convertEntry,
  deleteEntryFunction,
}) => {
  const history = useHistory();
  const [t] = useTranslation();
  const [modalToShow, setModalToShow] = useState('');
  const [modal, setModal] = useState(false);
  const [globalHour, setGlobalHour] = useState('');

  //start the clock
  if (globalHour === '') {
    homeHandler.minuteUpdate(setGlobalHour);
  }

  //update clock 20 seconds
  setInterval(homeHandler.minuteUpdate, 20000, setGlobalHour);

  const entriesSort = entries.sort((val1, val2) =>
    homeHandler.sortList(val1, val2, 'name'),
  );

  return (
    <CDataTable
      addTableClasses="users-table"
      items={entriesSort}
      fields={receptionHandler.fields(t)}
      clickableRows
      columnFilter
      tableFilter
      footer
      hover
      striped
      sorter
      size="sm"
      responsive
      itemsPerPageSelect
      itemsPerPage={25}
      pagination={true}
      isLoading={isLoading}
      noItemsViewSlot={
        <div className="text-center my-5">
          <h2>
            {t('pages.users.no-info')}
            <CIcon width="30" name="cilBan" className="text-danger mb-2" />
          </h2>
        </div>
      }
      onRowClick={(item) => {
        setModalToShow(item.id);
        setModal(!modal);
      }}
      scopedSlots={{
        timezone: (item) => {
          let hour = '';

          if (item.timezone && globalHour) {
            hour = globalHour.tz(item.timezone).format('HH:mm');
          }

          return <td>{hour}h</td>;
        },
        details: (item) => {
          return (
            <>
              {item.id === modalToShow && (
                <CModal show={modal} onClose={setModal} centered size="sm">
                  <CRow
                    md="12"
                    className="d-flex flex-row justify-content-center text-center"
                  >
                    <>
                      <header>
                        <h3 className="title">
                          {t('pages.reception.registration-edit.modal.title')}
                        </h3>
                      </header>

                      <main className="main-body">
                        <Button
                          name={t('btn.create-edit.edit')}
                          onClick={() =>
                            history.push(`/reception/reception_edit/${item.id}`)
                          }
                        />
                        <Button
                          name={t('btn.create-edit.convert')}
                          onClick={() => {
                            convertEntry(item.id);
                          }}
                        />
                        <Button
                          name={t('btn.create-edit.delete')}
                          isDanger
                          onClick={() => {
                            deleteEntryFunction(item.id);
                          }}
                        />
                      </main>
                    </>
                  </CRow>
                </CModal>
              )}
            </>
          );
        },
      }}
    />
  );
};

export default DataTable;
