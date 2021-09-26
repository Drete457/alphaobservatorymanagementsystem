import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm, CButton } from '@coreui/react';
import { InputField, TextAreaField } from 'components/administration/input';
import Buttons from 'components/administration/generic/buttons';
import genericHandler from 'helpers/generic';
import CIcon from '@coreui/icons-react';

const CardType = ({
  cards,
  type,
  isEdit,
  setIsEdit,
  setWasModified,
  genericList,
  setGeneric,
  originalData,
  setOriginalData,
}) => {
  const [t] = useTranslation();
  const [errorsCard, setErrorsCard] = useState([]);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.generic.card-types.title')}</h1>

        <Buttons
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          type={type}
          genericName={t('pages.generic.card-types.title')}
          genericList={genericList}
          setGeneric={setGeneric}
          create={{ id: '', name: '', color: '#ffffff', body: '' }}
          originalData={originalData}
          setError={setErrorsCard}
          setOriginalData={setOriginalData}
        />
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
                        placeholder={t('generic.card-type.placeholder')}
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
                      rows={card?.body?.split(/\r\n|\r|\n/).length}
                      placeholder={t('generic.card-type.placeholder-body')}
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
                        genericHandler.inputHandler(
                          setGeneric,
                          genericList,
                          type,
                          index,
                          event,
                        );
                        setWasModified(true);
                      }}
                      className="country-input-format"
                    />

                    <InputField
                      title={t('generic.card-type.color')}
                      name="color"
                      type="color"
                      value={card?.color}
                      errorMsg={errorsCard[index]?.color}
                      onChange={(event) => {
                        genericHandler.inputHandler(
                          setGeneric,
                          genericList,
                          type,
                          index,
                          event,
                        );
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
                          genericHandler.genericDelete(
                            setGeneric,
                            genericList,
                            type,
                            index,
                          );
                          setWasModified(true);
                        }}
                      >
                        <CIcon name={'cil-trash'} />
                      </CButton>
                    )}
                  </div>

                  <TextAreaField
                    name="body"
                    rows={card?.body?.split(/\r\n|\r|\n/).length}
                    placeholder={t('generic.card-type.placeholder-body')}
                    value={card?.body}
                    onChange={(event) => {
                      genericHandler.bodyHandler(
                        setGeneric,
                        genericList,
                        type,
                        index,
                        event,
                      );
                      setWasModified(true);
                    }}
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
