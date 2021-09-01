import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm, CButton } from '@coreui/react';
import { InputField } from 'components/administration/input';
import Buttons from 'components/administration/countries-buttons';
import CIcon from '@coreui/icons-react';

const Activities = ({
  activities,
  generic,
  setGeneric,
  isEdit,
  setIsEdit,
  setWasModified,
}) => {
  const [t] = useTranslation();
  const [errorsActivities, setErrorsActivities] = useState([]);
  console.log(activities);
  return (
    <>
      <main className="main-body">
        <CForm>
          {!isEdit?.activitiesType && (
            <>
              {activities?.map((activity, index) => {
                return (
                  <div key={index}>
                    <div className="country-input">
                      <InputField
                        title={t('countries.country.title')}
                        name="country"
                        type="text"
                        value={activity?.name}
                        errorMsg={errorsActivities[index]?.name}
                        className="country-input-format"
                        disabled
                      />

                      <InputField
                        title={t('countries.gmt.title')}
                        name="gmt"
                        type="checkbox"
                        value={activity?.extra}
                        errorMsg={errorsActivities[index]?.extra}
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
                      title={t('countries.country.title')}
                      name="country"
                      type="text"
                      placeholder={t('countries.country.placeholder')}
                      value={activity?.name}
                      errorMsg={errorsActivities[index]?.name}
                      onChange={(event) => {
                        setWasModified(true);
                      }}
                      className="country-input-format"
                      disabled={!isEdit}
                    />
                    <InputField
                      title={t('countries.gmt.title')}
                      name="gmt"
                      type="checkbox"
                      placeholder={t('countries.gmt.placeholder')}
                      value={activity?.extra}
                      errorMsg={errorsActivities[index]?.extra}
                      onChange={(event) => {
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
  );
};

export default Activities;
