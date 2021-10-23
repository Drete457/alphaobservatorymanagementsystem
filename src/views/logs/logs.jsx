import homeHandler from 'helpers/users';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { logs } from 'state/atoms';

const ViewLogs = () => {
  const [t] = useTranslation();
  const logsArray = useRecoilValue(logs);
  const logsArraySort = Array.from(logsArray).sort((val1, val2) =>
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
            >{`Colaborator: ${log.name} was modified by ${log.email} on date ${log.date}`}</li>
          ))}
        </ol>
      </main>
    </>
  );
};

export default ViewLogs;
