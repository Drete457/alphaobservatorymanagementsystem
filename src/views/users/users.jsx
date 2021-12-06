import { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { countries, generic, users, intervalIdClean } from 'state/atoms';
import homeHandler from 'helpers/users';
import Button from 'components/button';
import DataTable from 'components/users';

const Users = () => {
  const [t] = useTranslation();
  const history = useHistory();
  const [usersDataInfo, setUsersDataInfo] = useState([]);
  const [hasClean, setHasClean] = useState(false);
  const [globalHour, setGlobalHour] = useState('');
  const [intervalId, setIntervalId] = useRecoilState(intervalIdClean);

  const { collaborators, usersWithFollowers } = useRecoilValue(users);
  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);

  //start the clock
  if (globalHour === '') {
    homeHandler.minuteUpdate(setGlobalHour);
  }

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
          {t('pages.users.numberUsers') + ': ' + usersDataInfo?.length}
          <div className="users-button">
            <Button
              name={t('btn.create.excel')}
              onClick={() =>
                homeHandler.exportToExcel(usersDataInfo, genericList)
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

        <DataTable users={usersDataInfo} globalHour={globalHour} />
      </main>
    </>
  );
};

export default Users;
