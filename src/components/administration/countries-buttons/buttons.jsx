import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePostActivitie } from 'hooks/activities';
import countriesHandler from 'helpers/countries';
import Button from 'components/button';
import Loading from 'components/loading';

const Buttons = ({
  countries,
  setCountries,
  countriesOriginal,
  setCountriesOriginal,
  setError,
  setErrorCountries,
  isEdit,
  setIsEdit,
  wasModified,
  setWasModified,
  dataCountries,
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
              const newCountriesArray = [];

              countriesOriginal?.forEach((country) => {
                newCountriesArray.push({
                  country: country.country,
                  gmt: country.gmt,
                  id: country.id,
                });
              });

              const result = countriesHandler.wasModifiedVerification(
                wasModified,
                dataCountries,
                countriesOriginal,
              );

              setWasModified(result);
              setCountries(newCountriesArray);
              setIsEdit(false);
            }}
          />

          <Button
            name={t('btn.create-edit.save')}
            isDanger={false}
            onClick={() => {
              const newCountriesArray = [];

              countries?.forEach((country) => {
                newCountriesArray.push({
                  country: country.country,
                  gmt: country.gmt,
                  id: country.id,
                });
              });

              setCountriesOriginal(newCountriesArray);
              setIsEdit(false);
            }}
          />
        </div>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default Buttons;
