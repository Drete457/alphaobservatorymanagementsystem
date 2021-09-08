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

const ExcelDateToJSDate = (serial) => {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  return (
    date_info.getFullYear() +
    '-' +
    (date_info.getMonth() + 1) +
    '-' +
    date_info.getDate()
  );
};

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

        newUser.gender =
          user[2] != null ? filter(genericList?.gender, user[2]) : '';
        newUser.employment =
          user[3] != null ? filter(genericList?.ocupation, user[3]) : '';
        newUser.birthyear =
          user[4] != null ? filter(genericList?.years, user[4].toString()) : '';
        newUser.introductionOption =
          user[13] != null ? filter(genericList?.options, user[13]) : '';

        newUser.name = user[0] != null ? user[0] : ''; // text
        newUser.followed = user[1] + ''; // text
        newUser.surveyLink = user[5] != null ? user[5] : ''; // text
        newUser.surveyFriend = user[6] != null ? user[6] : ''; // text
        newUser.surveyFace = user[7] != null ? user[7] : ''; // text
        newUser.country = user[8] != null ? user[8] : ''; // text
        newUser.trelloCard = user[9] != null ? user[9] : ''; // text

        newUser.explainAlphaCafe =
          user[10] != null ? ExcelDateToJSDate(user[10]) : ''; // date
        newUser.training = user[11] != null ? ExcelDateToJSDate(user[11]) : ''; // date
        newUser.second = user[12] != null ? ExcelDateToJSDate(user[12]) : ''; // date
        newUser.community = user[14] != null ? ExcelDateToJSDate(user[14]) : ''; // date
        newUser.firstActivity =
          user[15] != null ? ExcelDateToJSDate(user[15]) : ''; // date
        newUser.surveyDate =
          user[16] != null ? ExcelDateToJSDate(user[16]) : ''; // date

        /*
        newUser.explainAlphaCafe =
          user[10] != null ? user[10].replaceAll('/', '-') : ''; // date
        newUser.training =
          user[11] != null ? user[11].replaceAll('/', '-') : ''; // date
        newUser.second = user[12] != null ? user[12].replaceAll('/', '-') : ''; // date
        newUser.community =
          user[14] != null ? user[14].replaceAll('/', '-') : ''; // date
        newUser.firstActivity =
          user[15] != null ? user[15].replaceAll('/', '-') : ''; // date
        newUser.surveyDate =
          user[16] != null ? user[16].replaceAll('/', '-') : ''; // date
        newUser.baseAmbit =
          user[13] != null ? user[13].replaceAll('/', '-') : ''; // date
        */

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
