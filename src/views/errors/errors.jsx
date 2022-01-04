import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loading from 'components/loading';
import { useGetErrors } from 'hooks/errors';
import homeHandler from 'helpers/users';

const ErrorsLogs = ({ match }) => {
  const [t] = useTranslation();
  const [errors, setErrors] = useState([]);

  const { isLoading, data, execute } = useGetErrors();

  useLayoutEffect(() => {
    execute();
  }, [execute]);

  useLayoutEffect(() => {
    if (data) {
      const array = Object.entries(data).map(([key, value]) => {
        return {
          time: new Date(key).toLocaleString(),
          code: value.code,
          message: value.message,
        };
      });

      const arraySort = array.sort?.((val1, val2) =>
        homeHandler.sortList(val1, val2, 'time'),
      );

      setErrors(arraySort);
    }
  }, [data]);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.errorslogs.title')}</h1>
      </header>

      <main>
        <ol className="text-center">
          {errors.map((log, index) => (
            <li key={index}>
              <br />
              Date: {log.time} - {log.code}
              <p>{log.message}</p>
            </li>
          ))}
        </ol>
      </main>
      {isLoading && <Loading />}
    </>
  );
};

export default ErrorsLogs;
