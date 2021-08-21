import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePostCountries } from 'hooks/countries';
import countriesHandler from 'helpers/countries';
import uniqueId from 'helpers/id-generator';
import homeHandler from 'helpers/users';
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

  const { isLoading, error, data, execute } = usePostCountries();

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
              onClick={() => {
                const countriesSort = countries.sort((country1, country2) =>
                  homeHandler.sortList(country1, country2, 'country'),
                );

                const newCountriesArray = [];

                countriesSort?.forEach((country) => {
                  newCountriesArray.push({
                    country: country.country,
                    gmt: country.gmt,
                    id: country.id,
                  });
                });

                if (
                  !countriesHandler.validateCountries(
                    newCountriesArray,
                    setErrorCountries,
                    t,
                  )
                ) {
                  execute(newCountriesArray);
                  setWasModified(false);
                }
              }}
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
              setErrorCountries([]);
              setIsEdit(false);
            }}
          />

          <Button
            name={t('btn.create-edit.save')}
            isDanger={false}
            onClick={() => {
              const countriesSort = countries.sort((country1, country2) =>
                homeHandler.sortList(country1, country2, 'country'),
              );

              const newCountriesArray = [];

              countriesSort?.forEach((country) => {
                newCountriesArray.push({
                  country: country.country,
                  gmt: country.gmt,
                  id: country.id,
                });
              });

              if (
                !countriesHandler.validateCountries(
                  newCountriesArray,
                  setErrorCountries,
                  t,
                )
              ) {
                setCountriesOriginal(newCountriesArray);
                setErrorCountries([]);
                setIsEdit(false);
              }
            }}
          />

          <Button
            name={t('btn.create-edit.countries')}
            isDanger={false}
            onClick={() => {
              const newCountriesArray = [
                { country: '', gmt: '', id: uniqueId() },
              ];

              countries?.forEach((country) => {
                newCountriesArray.push({
                  country: country.country,
                  gmt: country.gmt,
                  id: country.id,
                });
              });

              setCountries(newCountriesArray);
            }}
          />
        </div>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default Buttons;
