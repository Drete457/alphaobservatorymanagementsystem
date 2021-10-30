import { useState, useLayoutEffect, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { countries, generic, users } from 'state/atoms';
import {
  useDeleteReceptionCard,
  useGetReceptionCard,
  useGetReceptionCards,
} from 'hooks/reception';
import { usePostUser } from 'hooks/users';
import { deleteF } from 'hooks/files';
import receptionHandler from 'helpers/repection';
import ErrorInfo from 'components/error/error';
import DataTable from 'components/reception/view/reception-view';

const ReceptionView = () => {
  const [t] = useTranslation();
  const [entry, setEntry] = useState([]);
  const [errorInfo, setErrorInfo] = useState({});

  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);
  const { usersWithFollowers: usersList } = useRecoilValue(users);

  const { isLoading, error, data, execute } = useGetReceptionCards();
  const { data: entryData, execute: getEntry } = useGetReceptionCard();
  const { execute: deleteEntry } = useDeleteReceptionCard();
  const { execute: postUser } = usePostUser();
  const { execute: executeDelete } = deleteF();

  const convertEntry = (id) => {
    getEntry(id);
    execute();
  };

  const deleteEntryFunction = (id) => {
    const ref = 'profile/' + id + '.pdf';

    executeDelete(ref);
    deleteEntry(id);
    execute();
  };

  useEffect(() => {
    execute();
  }, [execute]);

  useLayoutEffect(() => {
    if (entryData) {
      const id = entryData.id;

      postUser(entryData);
      deleteEntry(id);
      execute();
    }
  }, [entryData, postUser, deleteEntry, execute]);

  useLayoutEffect(() => {
    if (data) {
      receptionHandler.buildEntryList(
        data,
        countriesList,
        genericList,
        usersList,
        setEntry,
      );
    }
  }, [data, countriesList, genericList, usersList]);

  useLayoutEffect(() => {
    if (error) {
      setErrorInfo(error);
    }
  }, [error]);

  return (
    <>
      {error ? (
        <ErrorInfo error={errorInfo} />
      ) : (
        <>
          <header>
            <h1 className="title">{t('pages.reception.title')}</h1>
          </header>

          <main className="main-body">
            <hr />
            <DataTable
              entries={entry}
              isLoading={isLoading}
              convertEntry={convertEntry}
              deleteEntryFunction={deleteEntryFunction}
            />
          </main>
        </>
      )}
    </>
  );
};

export default ReceptionView;
