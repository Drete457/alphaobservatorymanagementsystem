import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm, CButton } from '@coreui/react';
import {
  InputField,
  SelectFieldComponent,
} from 'components/administration/input';
import Buttons from 'components/administration/generic/buttons';
import genericHandler from 'helpers/generic';
import CIcon from '@coreui/icons-react';

const option = (options, value, t) => {
  const activityExtraValue = value
    ? t('generic.options.yes')
    : t('generic.options.no');

  const optionSelected = options.find(
    (option) => option.name === activityExtraValue,
  );

  return optionSelected?.id;
};

const Activities = ({
  activities,
  type,
  isEdit,
  setIsEdit,
  setWasModified,
  options,
  genericList,
  setGeneric,
  originalData,
  setOriginalData,
  wasModified,
}) => {
  const [t] = useTranslation();
  const [errorsActivities, setErrorsActivities] = useState([]);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.generic.activities-types.title')}</h1>

        <Buttons
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          type={type}
          genericName={t('pages.generic.activities-types.title')}
          genericList={genericList}
          setGeneric={setGeneric}
          create={{ id: '', name: '', extra: false }}
          originalData={originalData}
          setError={setErrorsActivities}
          setOriginalData={setOriginalData}
          wasModified={wasModified}
          setWasModified={setWasModified}
        />
      </header>

      <main className="main-body">
        <CForm>
          {!isEdit?.activitiesType && (
            <>
              {activities?.map((activity, index) => {
                return (
                  <div key={index}>
                    <div className="country-input">
                      <InputField
                        title={t('generic.activities-type.name')}
                        name="name"
                        type="text"
                        value={activity?.name}
                        errorMsg={errorsActivities[index]?.name}
                        className="country-input-format"
                        disabled
                      />

                      <InputField
                        title={t('generic.activities-type.extra')}
                        name="extra"
                        type="text"
                        value={
                          activity?.extra
                            ? t('generic.options.yes')
                            : t('generic.options.no')
                        }
                        errorMsg={errorsActivities[index]?.name}
                        className="country-input-format"
                        disabled
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {isEdit?.activitiesType &&
            activities?.map((activity, index) => {
              return (
                <div key={index}>
                  <div className="country-input">
                    <InputField
                      title={t('generic.activities-type.name')}
                      name="name"
                      type="text"
                      placeholder={t('generic.activities-type.placeholder')}
                      value={activity?.name}
                      errorMsg={errorsActivities[index]?.name}
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

                    <SelectFieldComponent
                      title={t('generic.activities-type.extra')}
                      name="extra"
                      placeholder={t(
                        'generic.activities-type.placeholderExtra',
                      )}
                      value={option(options, activity?.extra, t)}
                      errorMsg={errorsActivities[index]?.extra}
                      onChange={(event) => {
                        genericHandler.selectHandler(
                          setGeneric,
                          genericList,
                          type,
                          index,
                          event,
                        );
                        setWasModified(true);
                      }}
                      options={options}
                      className="user-input-format"
                    />

                    {!activity?.id && (
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
                </div>
              );
            })}
        </CForm>
      </main>
    </>
  );
};

export default Activities;
