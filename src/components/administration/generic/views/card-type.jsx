import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm, CButton } from '@coreui/react';
import { InputField } from 'components/administration/input';
import CIcon from '@coreui/icons-react';

const CardType = ({ activities, isEdit, setWasModified }) => {
  const [t] = useTranslation();
  const [errorsCard, setErrorsCard] = useState([]);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.generic.activities-types.title')}</h1>
      </header>

      <main className="main-body">
        <CForm>
          {!isEdit?.activitiesType && (
            <>
              {activities?.map((card, index) => {
                return (
                  <div key={index}>
                    <div className="country-input">
                      <InputField
                        title={t('generic.activities-type.name')}
                        name="name"
                        type="text"
                        value={card?.name}
                        errorMsg={errorsCard[index]?.name}
                        className="country-input-format"
                        disabled
                      />

                      <InputField
                        title={t('generic.activities-type.extra')}
                        name="color"
                        type="color"
                        errorMsg={errorsCard[index]?.color}
                        className="country-input-format"
                        disabled
                        style={{ background: card?.color }}
                      />
                    </div>
                    <div className="card-type-text-line">{card?.body}</div>
                  </div>
                );
              })}
            </>
          )}

          {isEdit?.activitiesType &&
            activities?.map((card, index) => {
              return (
                <div key={index}>
                  <div className="country-input">
                    <InputField
                      title={t('generic.activities-type.name')}
                      name="name"
                      type="text"
                      placeholder={t('generic.activities-type.placeholder')}
                      value={card?.name}
                      errorMsg={errorsCard[index]?.name}
                      onChange={(event) => {
                        setWasModified(true);
                      }}
                      className="country-input-format"
                    />

                    <InputField
                      title={t('generic.activities-type.name')}
                      name="color"
                      type="color"
                      placeholder={t('generic.activities-type.placeholder')}
                      value={card?.color}
                      errorMsg={errorsCard[index]?.color}
                      onChange={(event) => {
                        setWasModified(true);
                      }}
                      className="country-input-format"
                    />

                    {!card?.id && (
                      <CButton
                        className="country-trash"
                        shape="pill"
                        variant={'ghost'}
                        size="sm"
                        color="danger"
                        onClick={() => {
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
  );
};

export default CardType;
