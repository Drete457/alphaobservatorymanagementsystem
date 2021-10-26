import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CDataTable, CRow, CModal } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Button from 'components/button/button';
import DeleteReceptionWarming from 'components/reception/view/delete-entry';
import receptionHandler from 'helpers/repection';
import homeHandler from 'helpers/users';
import CIcon from '@coreui/icons-react';

const DataTable = ({ entries, isLoading, convertEntry, setChange }) => {
  const history = useHistory();
  const [t] = useTranslation();
  const [modalToShow, setModalToShow] = useState('');
  const [deleteEntry, setDeleteEntry] = useState(false);

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
      }}
      scopedSlots={{
        details: (item) => {
          return (
            <>
              {item.id === modalToShow && (
                <CModal show={true} centered size="sm">
                  <CRow
                    md="12"
                    className="d-flex flex-row justify-content-center"
                  >
                    {deleteEntry ? (
                      <DeleteReceptionWarming
                        t={t}
                        id={item.id}
                        setDelete={setDeleteEntry}
                        setChange={setChange}
                      />
                    ) : (
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
                              history.push(
                                `/reception/reception_edit/${item.id}`,
                              )
                            }
                          />
                          <Button
                            name={t('btn.create-edit.convert')}
                            onClick={() => {
                              convertEntry(item.id);
                              setChange(item.id);
                            }}
                          />
                          <Button
                            name={t('btn.create-edit.delete')}
                            isDanger
                            onClick={() => {
                              setDeleteEntry(true);
                            }}
                          />
                        </main>
                      </>
                    )}
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
