import { useState, useLayoutEffect } from 'react';
import { useHistory, Prompt } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { users, generic } from 'state/atoms';
import { CForm } from '@coreui/react';
import { SelectFieldComponent, InputField } from 'components/activities/input';
import activitiesHandler from 'helpers/activities';
import ErrorInfo from 'components/error';
import Submit from 'components/activities/buttons/submit';
import dateGenerator from 'helpers/date-generator';
import uniqueId from 'helpers/id-generator';

const NewActivity = () => {
  const history = useHistory();

  //generate the date for the activity
  const newDate = dateGenerator();
  const newActivityStruct = {
    type: '',
    list: '',
    listInfo: [],
    id: uniqueId(),
  };

  const [t] = useTranslation();

  const [newActivity, setActivity] = useState({
    ...newActivityStruct,
    date: newDate,
  });
  const [errorActivity, setErrorActivity] = useState({});

  const [haveExtra, setHaveExtra] = useState(false);
  const [wasModified, setWasModified] = useState(false);
  const [error, setError] = useState(null);

  const { usersWithFollowers: usersList } = useRecoilValue(users);
  const { activitiesType } = useRecoilValue(generic);

  useLayoutEffect(() => {
    if (usersList.length === 0) {
      history.push('/users');
    }
  }, [usersList, activitiesType, history]);

  useLayoutEffect(() => {
    if (newActivity.type) {
      const haveExtra = activitiesType.find(
        (activity) => activity.id === newActivity.type,
      );

      setHaveExtra(haveExtra?.extra);
    }
  }, [newActivity.type, activitiesType]);

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
            <h1 className="title">
              {t('pages.activities.registration.title')}
            </h1>
            <Submit
              newActivity={newActivity}
              setError={setError}
              setErrorActivity={setErrorActivity}
              haveExtra={haveExtra}
              setWasModified={setWasModified}
            />
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
                    setWasModified(true);
                  }}
                  options={activitiesType}
                  className="activity-input-format"
                />

                <InputField
                  title={t('activities.fields.date.title')}
                  name="date"
                  type="date"
                  value={newActivity?.date}
                  errorMsg={errorActivity?.date}
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
                    options={usersList}
                    className="activity-input-format-users"
                    isMulti={true}
                  />
                </div>
              )}

              {Array.from(newActivity.list)?.map((activity, index) => {
                const participant = usersList.find(
                  (user) => user.id === activity,
                );
                return (
                  <div className="activity-input" key={participant.id}>
                    {haveExtra ? (
                      <InputField
                        title={participant.name}
                        name="listInfo"
                        id={index}
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
                        onChange={(event) => {
                          activitiesHandler.activityMultiInputHandler(
                            event,
                            setActivity,
                            newActivity,
                            participant,
                          );
                        }}
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

export default NewActivity;
