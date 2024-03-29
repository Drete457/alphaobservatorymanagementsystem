import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { users } from 'state/atoms';
import homeHandler from 'helpers/users';

const ViewLogs = ({ match }) => {
  const [t] = useTranslation();
  const { collaborators, entries } = useRecoilValue(users);
  const data = match.path === '/entries' ? entries : collaborators;

  const logsToUse = [];
  data.forEach((user) => {
    if (user?.lastModification) {
      user.lastModification.forEach((log) =>
        logsToUse.push({ ...log, name: user.name }),
      );
    }
  });

  const logsArraySort = Array.from(logsToUse).sort((val1, val2) =>
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
            <li key={index}>
              {match.path === '/entries'
                ? `Entry: ${log.name} was modified by ${log.email} on date ${log.date}`
                : `Collaborator: ${log.name} was modified by ${log.email} on date ${log.date}`}
            </li>
          ))}
        </ol>
      </main>
    </>
  );
};

export default ViewLogs;
