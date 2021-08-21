import { useState, useLayoutEffect, useEffect } from 'react';
import { Prompt } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CForm, CButton } from '@coreui/react';
import { useGetCountries } from 'hooks/countries';
import { InputField } from 'components/administration/input';
import Buttons from 'components/administration/countries-buttons';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import countriesHandler from 'helpers/countries';
import CIcon from '@coreui/icons-react';

const Countries = () => {
  const [t] = useTranslation();

  const [countries, setCountries] = useState([]);
  const [countriesOriginal, setCountriesOriginal] = useState([]);
  const [errorCountries, setErrorCountries] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [wasModified, setWasModified] = useState(false);
  const [error, setError] = useState(null);

  const {
    isLoading,
    error: errorGetCountries,
    data,
    execute,
  } = useGetCountries();

  useLayoutEffect(() => {
    execute();
  }, [execute]);

  useLayoutEffect(() => {
    if (data) {
      const newCountriesarray = [];
      const newCountriesArrayOriginal = [];

      data?.forEach((country) => {
        newCountriesarray.push({
          country: country.country,
          gmt: country.gmt,
          id: country.id,
        });

        newCountriesArrayOriginal.push({
          country: country.country,
          gmt: country.gmt,
          id: country.id,
        });
      });

      setCountries(newCountriesarray);
      setCountriesOriginal(newCountriesArrayOriginal);
    }
  }, [data]);

  useEffect(() => {
    const newError = error || errorGetCountries;

    if (newError) {
      setError(error);
    }
  }, [error, errorGetCountries]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <>
          <Prompt
            when={countriesHandler.wasModifiedVerification(
              wasModified,
              data,
              countries,
            )}
            message={() => t('pages.user.leaving-the-page')}
          />
          <header>
            <h1 className="title">{t('pages.countries.title')}</h1>

            <Buttons
              countries={countries}
              setCountries={setCountries}
              countriesOriginal={countriesOriginal}
              setCountriesOriginal={setCountriesOriginal}
              setError={setError}
              setErrorCountries={setErrorCountries}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              wasModified={wasModified}
              setWasModified={setWasModified}
              dataCountries={data}
            />
          </header>

          <main className="main-body">
            <CForm>
              {!isEdit && (
                <>
                  {countries?.map((country, index) => {
                    return (
                      <div key={index}>
                        <div className="country-input">
                          <InputField
                            title={t('countries.country.title')}
                            name="country"
                            type="text"
                            value={country?.country}
                            errorMsg={errorCountries[index]?.country}
                            className="country-input-format"
                            disabled
                          />

                          <InputField
                            title={t('countries.gmt.title')}
                            name="gmt"
                            type="text"
                            value={country?.gmt}
                            errorMsg={errorCountries[index]?.gmt}
                            className="country-input-format"
                            disabled
                          />
                        </div>
                      </div>
                    );
                  })}
                </>
              )}

              {isEdit &&
                countries?.map((country, index) => {
                  return (
                    <div key={index}>
                      <div className="country-input">
                        <InputField
                          title={t('countries.country.title')}
                          name="country"
                          type="text"
                          placeholder={t('countries.country.placeholder')}
                          value={country?.country}
                          errorMsg={errorCountries[index]?.country}
                          onChange={(event) => {
                            countriesHandler.inputHandler(
                              event,
                              countries,
                              setCountries,
                              index,
                            );
                            setWasModified(true);
                          }}
                          className="country-input-format"
                          disabled={!isEdit}
                        />
                        <InputField
                          title={t('countries.gmt.title')}
                          name="gmt"
                          type="text"
                          placeholder={t('countries.gmt.placeholder')}
                          value={country?.gmt}
                          errorMsg={errorCountries[index]?.gmt}
                          onChange={(event) => {
                            countriesHandler.inputHandler(
                              event,
                              countries,
                              setCountries,
                              index,
                            );
                            setWasModified(true);
                          }}
                          className="country-input-format"
                          disabled={!isEdit}
                        />
                        <CButton
                          className="country-trash"
                          shape="pill"
                          variant={'ghost'}
                          size="sm"
                          color="danger"
                          onClick={() => {
                            countriesHandler.countryDelete(
                              index,
                              countries,
                              setCountries,
                            );
                            setWasModified(true);
                          }}
                        >
                          <CIcon name={'cil-trash'} />
                        </CButton>
                      </div>
                    </div>
                  );
                })}
            </CForm>
          </main>
        </>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default Countries;
