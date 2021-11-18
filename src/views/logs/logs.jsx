import homeHandler from 'helpers/users';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { users } from 'state/atoms';

const ViewLogs = ({ match }) => {
  console.log(match);
  const [t] = useTranslation();
  const { logs } = useRecoilValue(users);
  const logsArraySort = Array.from(logs).sort((val1, val2) =>
    homeHandler.sortList(val1, val2, 'date'),
  );
  const logsArraySortReverse = logsArraySort.reverse();

  return (
    <>
      <header>
        <h1 className="title">{t('pages.logs.title')}</h1>
      </header>

      <main>
        <ol className="text-center">
          {logsArraySortReverse.map((log, index) => (
            <li
              key={index}
            >{`Collaborator: ${log.name} was modified by ${log.email} on date ${log.date}`}</li>
          ))}
        </ol>
      </main>
    </>
  );
};

export default ViewLogs;
