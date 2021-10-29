import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { generic, users } from 'state/atoms';
import homeHandler from 'helpers/users';
import Button from 'components/button';
import DataTable from 'components/users';

const Users = () => {
  const [t] = useTranslation();
  const history = useHistory();

  const genericList = useRecoilValue(generic);
  const { usersDataInfo } = useRecoilValue(users);

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

        <DataTable users={usersDataInfo} />
      </main>
    </>
  );
};

export default Users;
