import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { countries, generic } from 'state/atoms';
import { usePostUser } from 'hooks/users';
import { tableToJson } from 'components/table-import';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import Button from 'components/button';
import userHandler from 'helpers/user';
import uniqueId from 'helpers/id-generator';

const filter = (list, valueToSearch) => {
  if (Array.isArray(list)) {
    const value = list.find((value) => value.name === valueToSearch);

    return value?.id;
  }
};

const TableImport = () => {
  const [t] = useTranslation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [tableFile, setTableFile] = useState([]);
  const inputFile = useRef(null);

  const countriesList = useRecoilValue(countries);
  const genericList = useRecoilValue(generic);

  const { isLoading: isLoadingSending, error, execute } = usePostUser();

  const onButtonClick = () => {
    inputFile.current.click();
  };

  useLayoutEffect(() => {
    if (genericList === null || genericList === undefined) {
      history.push('/users');
    }
  }, [genericList, history]);

  useEffect(() => {
    if (tableFile.length > 0) {
      let count = 0;

      tableFile.forEach((user) => {
        const newUser = {
          ...userHandler.userFormat,
          id: uniqueId(),
        };

        newUser.name = user[0] != null ? user[0] : ''; // text
        newUser.country = user[4] != null ? user[4] : ''; // text
        newUser.trelloCard = user[5] != null ? user[5] : ''; // text
        newUser.surveyLink = user[14] != null ? user[14] : ''; // text
        newUser.surveyFriend = user[15] != null ? user[15] : ''; // text
        newUser.surveyFace = user[16] != null ? user[16] : ''; // text
        newUser.training = user[7] != null ? user[7].replaceAll('/', '-') : ''; // date
        newUser.second = user[8] != null ? user[8].replaceAll('/', '-') : ''; // date

        newUser.community =
          user[10] != null ? user[10].replaceAll('/', '-') : ''; // date
        newUser.firstActivity =
          user[11] != null ? user[11].replaceAll('/', '-') : ''; // date
        newUser.surveyDate =
          user[12] != null ? user[12].replaceAll('/', '-') : ''; // date
        newUser.baseAmbit =
          user[13] != null ? user[13].replaceAll('/', '-') : ''; // date

        newUser.gender =
          user[1] != null ? filter(genericList?.gender, user[1]) : '';

        newUser.employment =
          user[2] != null ? filter(genericList?.ocupation, user[2]) : '';

        newUser.birthyear =
          user[3] != null ? filter(genericList?.years, user[3].toString()) : '';

        newUser.introductionOption =
          user[9] != null ? filter(genericList?.options, user[9]) : '';

        if (newUser.name !== '') {
          execute(newUser);
          count++;
        }
      });

      if (count === tableFile.length) {
        history.push('/users');
      }
    }
  }, [tableFile, genericList, countriesList, execute, history]);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.table-import.title')}</h1>
      </header>

      <main>
        {error ? (
          <ErrorInfo error={error} />
        ) : (
          <div className="table_import">
            <input
              type="file"
              id="file"
              ref={inputFile}
              accept=".xlsx"
              className="sr-only"
              onChange={(event) => {
                setIsLoading(true);
                tableToJson(event).then((result) => {
                  setTableFile(result);
                  setIsLoading(false);
                });
              }}
            />
            <Button
              name={t('btn.table-import.button-import')}
              onClick={onButtonClick}
            />
          </div>
        )}

        {isLoading && <Loading />}
        {isLoadingSending && <Loading />}
      </main>
    </>
  );
};

export default TableImport;
