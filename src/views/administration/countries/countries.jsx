import { useState, useLayoutEffect, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CForm, CButton } from '@coreui/react';
import { useGetCountries } from 'hooks/countries';
import { InputField } from 'components/administration/input';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import CIcon from '@coreui/icons-react';

const Countries = () => {
  const history = useHistory();
  const [t] = useTranslation();

  const [countries, setCountries] = useState({});
  const [errorCountries, setErrorCountries] = useState({});

  const [isEdit, setisEdit] = useState(false);
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
          <header>
            <h1 className="title">{t('pages.countries.title')}</h1>
          </header>

          <main className="main-body">
            <CForm>
              {Array.from(countries)?.map((country, index) => {
                return (
                  <div key={index}>
                    <div className="country-input">
                      <InputField
                        title={t('pages.countries.country')}
                        name="country"
                        type="text"
                        value={country?.country}
                        errorMsg={errorCountries?.country}
                        onChange={(event) => {}}
                        className="country-input-format"
                        disabled={!isEdit}
                      />

                      <InputField
                        title={t('pages.countries.gmt')}
                        name="country"
                        type="text"
                        value={country?.gmt}
                        errorMsg={errorCountries?.gmt}
                        onChange={(event) => {}}
                        className="country-input-format"
                        disabled={!isEdit}
                      />

                      <CButton
                        className="country-trash"
                        shape="pill"
                        variant={'ghost'}
                        size="sm"
                        color="danger"
                        onClick={() => {}}
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

/*     return (
        
    );
};

export default EditActivity;
 */
