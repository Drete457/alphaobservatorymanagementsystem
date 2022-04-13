import { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { countries, generic, users, intervalIdClean } from 'state/atoms';
import { DynamicGrid } from 'helpers/dynamic-table';
import homeHandler from 'helpers/users';
import Button from 'components/button';
import DataTable from 'components/users';

const Users = () => {
  const [t] = useTranslation();
  const history = useHistory();
  const [usersDataInfo, setUsersDataInfo] = useState([]);
  const [hasClean, setHasClean] = useState(false);
  const [globalHour, setGlobalHour] = useState('');
  const [registeredNumber, setRegisteredNumber] = useState(0);
  const [tableToExcel, setTabletoExcel] = useState({});
  const [isDynamicTable, setDynamicTable] = useState(false);
  const [gridApi, setGridApi] = useState(null);

  const [intervalId, setIntervalId] = useRecoilState(intervalIdClean);
  const { collaborators, usersWithFollowers } = useRecoilValue(users);

  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);

  //start the clock
  if (globalHour === '') {
    homeHandler.minuteUpdate(setGlobalHour);
  }

  const onBtForEachLeafNode = () => {
    const newArray = [];

    gridApi.forEachNodeAfterFilterAndSort((node) => newArray.push(node.data));

    return newArray;
  };

  const updateDynamicTableRegisteredNumber = () => {
    const newArray = [];

    if (gridApi) {
      gridApi.forEachNodeAfterFilterAndSort((node) => newArray.push(node.data));

      setRegisteredNumber(newArray.length);
    }
  };

  useLayoutEffect(() => {
    if (collaborators && countriesList && genericList) {
      homeHandler.buildUserList(
        collaborators,
        usersWithFollowers,
        countriesList,
        genericList,
        setUsersDataInfo,
      );
    }
  }, [collaborators, usersWithFollowers, countriesList, genericList]);

  useLayoutEffect(() => {
    if (!hasClean) {
      clearInterval(intervalId);
      setHasClean(true);
    }
  }, [intervalId, hasClean]);

  useLayoutEffect(() => {
    //update clock 20 seconds
    const id = setInterval(homeHandler.minuteUpdate, 20000, setGlobalHour);

    setIntervalId(id);
  }, [setIntervalId]);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.users.title')}</h1>
      </header>

      <main>
        <hr />
        <nav className="users-nav h3">
          {t('pages.users.numberUsers') + ': ' + registeredNumber}
          <div className="users-button">
            {isDynamicTable ? (
              <Button
                name={t('btn.dynamic.false')}
                onClick={() => setDynamicTable(false)}
                className="button-font-weight"
              />
            ) : (
              <Button
                name={t('btn.dynamic.true')}
                onClick={() => setDynamicTable(true)}
                className="button-font-weight"
              />
            )}
            <Button
              name={t('btn.create.excel')}
              onClick={() =>
                homeHandler.exportToExcel(
                  isDynamicTable ? onBtForEachLeafNode() : tableToExcel,
                )
              }
              className="button-font-weight"
            />
            <Button
              name={t('btn.create.user')}
              onClick={() => history.push(`/user/new_user`)}
              className="button-font-weight"
            />
          </div>
        </nav>
        <hr />

        {isDynamicTable ? (
          <>
            <div className="ag-theme-alpine-dark" style={{ height: '50vw' }}>
              <DynamicGrid
                data={homeHandler.buildDataDynamicTable(usersDataInfo)}
                setGridApi={setGridApi}
                updateDynamicTableRegisteredNumber={
                  updateDynamicTableRegisteredNumber
                }
              />
            </div>
          </>
        ) : (
          <DataTable
            users={usersDataInfo}
            globalHour={globalHour}
            setRegisteredNumber={setRegisteredNumber}
            setTabletoExcel={setTabletoExcel}
          />
        )}
      </main>
    </>
  );
};

export default Users;
