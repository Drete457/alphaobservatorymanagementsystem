import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { logs } from 'state/atoms';

const ViewLogs = () => {
  const [t] = useTranslation();
  const logsArray = useRecoilValue(logs);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.logs.title')}</h1>
      </header>

      <main>
        <ol className="text-center">
          {logsArray.map((log, index) => (
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
