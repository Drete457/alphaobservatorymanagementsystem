import { useState, useLayoutEffect, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { countries, generic, users, intervalIdClean } from 'state/atoms';
import {
  useDeleteReceptionCard,
  useGetReceptionCard,
  useGetReceptionCards,
} from 'hooks/reception';
import { usePostUser } from 'hooks/users';
import { deleteF } from 'hooks/files';
import receptionHandler from 'helpers/repection';
import homeHandler from 'helpers/users';
import ErrorInfo from 'components/error/error';
import DataTable from 'components/reception/view/reception-view';

const ReceptionView = () => {
  const [t] = useTranslation();
  const history = useHistory();
  const [entry, setEntry] = useState([]);
  const [errorInfo, setErrorInfo] = useState({});
  const [globalHour, setGlobalHour] = useState('');

  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);
  const [intervalId, setIntervalId] = useRecoilState(intervalIdClean);
  const { usersWithFollowers: usersList } = useRecoilValue(users);

  const { isLoading, error, data, execute } = useGetReceptionCards();
  const { data: entryData, execute: getEntry } = useGetReceptionCard();
  const { execute: deleteEntry } = useDeleteReceptionCard();
  const { execute: postUser } = usePostUser();
  const { execute: executeDelete } = deleteF();

  //start the clock
  if (globalHour === '') {
    homeHandler.minuteUpdate(setGlobalHour);
  }

  const convertEntry = (id) => {
    getEntry(id);
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
      const link = `/user/view/${id}`;

      postUser(entryData);
      deleteEntry(id);
      history.push(link);
    }
  }, [entryData, postUser, deleteEntry, history]);

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

  useLayoutEffect(() => {
    clearInterval(intervalId);
  }, [intervalId]);

  useLayoutEffect(() => {
    //update clock 20 seconds
    const id = setInterval(homeHandler.minuteUpdate, 20000, setGlobalHour);

    setIntervalId(id);
  }, [setIntervalId]);

  return (
    <>
      {error ? (
        <ErrorInfo error={errorInfo} />
      ) : (
        <>
          <header>
            <h1 className="title">{t('pages.reception.title')}</h1>
          </header>

          <main>
            <hr />
            <nav className="users-nav h3">
              {t('pages.reception.numberUsers') + ': ' + entry?.length}
            </nav>
            <hr />
            <DataTable
              entries={entry}
              isLoading={isLoading}
              convertEntry={convertEntry}
              deleteEntryFunction={deleteEntryFunction}
              globalHour={globalHour}
            />
          </main>
        </>
      )}
    </>
  );
};

export default ReceptionView;
