/* import { useState, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { listUsers } from 'state/atoms';
import { CForm } from '@coreui/react';
import activitiesHandler from 'helpers/activities';
import activitiesTypes from 'assets/mocks/activities.js';
import ErrorInfo from 'components/error';
//import Submit from 'components/activities/buttons/submit';

const ViewActivity = ({ match }) => {
  const history = useHistory();
  //generate the date for the activity
  
  const [t] = useTranslation();
  const userList = useRecoilValue(listUsers);

  const [newActivity, setActivity] = useState({
    ...newActivityStruct,
    date: newDate,
  });
  const [errorActivity, setErrorActivity] = useState({});

  const [haveExtra, setHaveExtra] = useState(false);
  const [error, setError] = useState(null);

    const { isLoading, error: errorServer, data, execute } = useGetActivity();

    useLayoutEffect(() => {
        const userID = match.params.id;
        execute(userID);
    }, [execute, match]);

  useLayoutEffect(() => {
    if (userList.length === 0) {
      history.push('/users');
    }
  }, [userList, history]);

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
                  errorMsg={errorActivity?.type}
                  onChange={(value) => {
                    activitiesHandler.activitySelectHandler(
                      'type',
                      value,
                      setActivity,
                      newActivity,
                    );
                    setErrorActivity({});
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
                    errorMsg={errorActivity?.list}
                    onChange={(value) => {
                      activitiesHandler.activityMultiSelectHandler(
                        'list',
                        value,
                        setActivity,
                        newActivity,
                      );
                      setErrorActivity({});
                    }}
                    options={userList}
                    className="activity-input-format-users"
                    isMulti={true}
                  />
                </div>
              )}

              {Array.from(newActivity.list).map?.((activity) => {
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
                        type="number"
                        value={
                          newActivity.listInfo.find(
                            (user) => user.id === participant.id,
                          )?.value
                        }
                        errorMsg={errorActivity?.listInfo}
                        onChange={(event) =>
                          activitiesHandler.activityMultiInputHandler(
                            event,
                            setActivity,
                            newActivity,
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
          </main>
        </>
      )}
    </>
  );
};

export default ViewActivity;
 */
