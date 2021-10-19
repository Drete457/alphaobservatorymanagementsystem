import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { logs } from 'state/atoms';

const ViewLogs = () => {
  const [t] = useTranslation();
  const LogsArray = useRecoilValue(logs);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.logs.title')}</h1>
      </header>

      <main></main>
    </>
  );
};

export default ViewLogs;
