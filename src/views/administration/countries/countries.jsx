import { useState, useLayoutEffect, useEffect } from 'react';
import { useHistory, Prompt } from 'react-router-dom';
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
  const history = useHistory();
  const [t] = useTranslation();

  const [countries, setCountries] = useState([]);
  const [countriesOriginal, setCountriesOriginal] = useState([]);
  const [errorCountries, setErrorCountries] = useState({});
  console.log('Modifided: ', countries);
  console.log('Original: ', countriesOriginal);
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
      setCountries(data);
      setCountriesOriginal(data);
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
            when={wasModified}
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
            />
          </header>

          <main className="main-body">
            <CForm>
              {countries?.map((country, index) => {
                return (
                  <div key={index}>
                    <div className="country-input">
                      <InputField
                        title={t('pages.countries.country')}
                        name="country"
                        type="text"
                        value={country?.country}
                        errorMsg={errorCountries?.country}
                        onChange={(event) => {
                          countriesHandler.inputHandler(
                            event,
                            setCountries,
                            countries,
                            index,
                          );
                          setWasModified(true);
                        }}
                        className="country-input-format"
                        disabled={!isEdit}
                      />

                      <InputField
                        title={t('pages.countries.gmt')}
                        name="gmt"
                        type="text"
                        value={country?.gmt}
                        errorMsg={errorCountries?.gmt}
                        onChange={(event) => {
                          countriesHandler.inputHandler(
                            event,
                            setCountries,
                            countries,
                            index,
                          );
                          setWasModified(true);
                        }}
                        className="country-input-format"
                        disabled={!isEdit}
                      />

                      {isEdit && (
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
                      )}
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

/*     return (
        
    );
};

export default EditActivity;
 */
