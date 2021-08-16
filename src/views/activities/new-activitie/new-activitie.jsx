import { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { listUsers } from 'state/atoms';
import { activityList } from 'state/selectors';
import { CForm } from '@coreui/react';
import { SelectFieldComponent, InputField } from 'components/activities/input';
import activitiesHandler from 'helpers/activities';
import activitiesTypes from 'assets/mocks/activities.js';
import ErrorInfo from 'components/error';
import Submit from 'components/activities/buttons/submit';
import Loading from 'components/loading';
import dateGenerator from 'helpers/date-generator';

const NewActivitie = () => {
  //TODO: a ser retirado assim que o backend tiver a funcionar
  const setGlobalActivity = useSetRecoilState(activityList);

  //generate the date for the activity
  const newDate = dateGenerator();

  const [t] = useTranslation();
  const userList = useRecoilValue(listUsers);

  const [newActivity, setActivity] = useState({
    type: '',
    date: newDate,
    list: '',
    listInfo: [],
  });
  const [haveExtra, setHaveExtra] = useState(false);
  //const [error, setError] = useState(null);
  const error = null;
  const isLoading = false;

  useLayoutEffect(() => {
    if (newActivity.type) {
      const haveExtra = activitiesTypes.find(
        (activity) => activity.id === newActivity.type,
      );

      setHaveExtra(haveExtra?.extra);
    }
  }, [newActivity.type]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <>
          <header>
            <h1 className="title">
              {t('pages.activities.registration.title')}
            </h1>
          </header>

          <main className="main-body">
            <CForm>
              <div className="activity-input">
                <SelectFieldComponent
                  title={t('activities.fields.type.title')}
                  name="type"
                  placeholder={t('activities.fields.type.placeholder')}
                  value={newActivity?.type}
                  onChange={(value) => {
                    activitiesHandler.activitySelectHandler(
                      'type',
                      value,
                      setActivity,
                      newActivity,
                    );
                  }}
                  options={activitiesTypes}
                  className="activity-input-format"
                />

                <InputField
                  title={t('activities.fields.date.title')}
                  name="date"
                  type="date"
                  value={newActivity?.date}
                  errorMsg={''}
                  onChange={(event) =>
                    activitiesHandler.activityInputHandler(
                      event,
                      setActivity,
                      newActivity,
                    )
                  }
                  className="activity-input-format"
                />
              </div>

              {newActivity.type && (
                <div className="activity-input">
                  <SelectFieldComponent
                    title={t('activities.fields.list.title')}
                    name="list"
                    placeholder={t('activities.fields.list.placeholder')}
                    value={newActivity?.list}
                    onChange={(value) =>
                      activitiesHandler.activityMultiSelectHandler(
                        'list',
                        value,
                        setActivity,
                        newActivity,
                      )
                    }
                    options={userList}
                    className="activity-input-format-users"
                    isMulti={true}
                  />
                </div>
              )}

              {Array.from(newActivity.list).map?.((activity, index) => {
                const participant = userList.find(
                  (user) => user.id === activity,
                );

                return (
                  <div className="activity-input" key={participant.id}>
                    {haveExtra ? (
                      <InputField
                        title={participant.name}
                        name="listInfo"
                        placeholder={t(
                          'activities.fields.listInfo.placeholder',
                        )}
                        type="text"
                        value={newActivity.listInfo[index]?.value}
                        errorMsg={''}
                        onChange={(event) =>
                          activitiesHandler.activityMultiInputHandler(
                            event,
                            setActivity,
                            newActivity,
                            index,
                            participant,
                          )
                        }
                        className="activity-input-format"
                      />
                    ) : (
                      <p className="activity-input-format">
                        {participant.name}
                      </p>
                    )}
                  </div>
                );
              })}
            </CForm>
            <Submit
              newActivity={newActivity}
              setGlobalActivity={setGlobalActivity}
            />
          </main>
        </>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default NewActivitie;
