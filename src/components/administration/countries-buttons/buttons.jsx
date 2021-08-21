import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePostActivitie } from 'hooks/activities';
import Button from 'components/button';
import Loading from 'components/loading';

const Submit = ({
  countries,
  setCountries,
  countriesOriginal,
  setCountriesOriginal,
  setError,
  setErrorCountries,
  isEdit,
  setIsEdit,
  wasModified,
}) => {
  const history = useHistory();
  const [t] = useTranslation();
  const { isLoading, error, data, execute } = usePostActivitie();

  useEffect(() => {
    if (data) {
      history.push(`/users`);
    }
  }, [data, history]);

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [setError, error]);

  return (
    <>
      {!isEdit && (
        <div className="user-submit-buttons">
          <Button
            name={t('btn.create-edit.edit')}
            isDanger={false}
            onClick={() => setIsEdit(true)}
          />

          {wasModified && (
            <Button
              name={t('btn.create-edit.submit')}
              isDanger={false}
              onClick={() => {}}
            />
          )}
        </div>
      )}
      {isEdit && (
        <div className="user-submit-buttons">
          <Button
            name={t('btn.create-edit.cancel')}
            isDanger={true}
            onClick={() => {
              setCountries(countriesOriginal);
              setIsEdit(false);
            }}
          />
          <Button
            name={t('btn.create-edit.save')}
            isDanger={false}
            onClick={() => {
              setCountriesOriginal(countries);
              setIsEdit(false);
            }}
          />
        </div>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default Submit;
