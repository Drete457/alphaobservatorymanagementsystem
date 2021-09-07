import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm, CButton } from '@coreui/react';
import { InputField, TextAreaField } from 'components/administration/input';
import CIcon from '@coreui/icons-react';

const CardType = ({ cards, isEdit, setWasModified }) => {
  const [t] = useTranslation();
  const [errorsCard, setErrorsCard] = useState([]);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.generic.card-types.title')}</h1>
      </header>

      <main className="main-body">
        <CForm>
          {!isEdit?.cardTypes && (
            <>
              {cards?.map((card, index) => {
                return (
                  <div key={index}>
                    <div className="country-input">
                      <InputField
                        title={t('generic.card-type.name')}
                        name="name"
                        type="text"
                        value={card?.name}
                        errorMsg={errorsCard[index]?.name}
                        className="country-input-format"
                        disabled
                      />

                      <InputField
                        title={t('generic.card-type.color')}
                        name="color"
                        type="color"
                        errorMsg={errorsCard[index]?.color}
                        className="country-input-format"
                        disabled
                        style={{ background: card?.color }}
                      />
                    </div>

                    <TextAreaField
                      rows={card?.body.split(/\r\n|\r|\n/).length}
                      placeholder={t('generic.card-type.placeholder')}
                      value={card?.body}
                      onChange={(event) => {}}
                      disabled={true}
                    />
                  </div>
                );
              })}
            </>
          )}

          {isEdit?.cardTypes &&
            cards?.map((card, index) => {
              return (
                <div key={index}>
                  <div className="country-input">
                    <InputField
                      title={t('generic.card-type.name')}
                      name="name"
                      type="text"
                      placeholder={t('generic.card-type.placeholder')}
                      value={card?.name}
                      errorMsg={errorsCard[index]?.name}
                      onChange={(event) => {
                        setWasModified(true);
                      }}
                      className="country-input-format"
                    />

                    <InputField
                      title={t('generic.card-type.color')}
                      name="color"
                      type="color"
                      placeholder={t('generic.card-type.placeholder-body')}
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
                  <TextAreaField
                    placeholder={t('user.fields.cards.bodyplaceholder')}
                    value={card?.body}
                    onChange={(event) => {}}
                  />
                </div>
              );
            })}
        </CForm>
      </main>
    </>
  );
};

export default CardType;
