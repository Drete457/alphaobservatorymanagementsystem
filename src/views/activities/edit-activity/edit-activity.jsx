import { useState, useLayoutEffect, useEffect } from 'react';
import { useHistory, Prompt } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { users, generic } from 'state/atoms';
import { CForm } from '@coreui/react';
import { useGetActivity } from 'hooks/activities';
import { SelectFieldComponent, InputField } from 'components/activities/input';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import Submit from 'components/activities/buttons/submit';
import activitiesHandler from 'helpers/activities';

const EditActivity = ({ match }) => {
  const history = useHistory();
  const [t] = useTranslation();

  const [activity, setActivity] = useState({});
  const [errorActivity, setErrorActivity] = useState({});

  const [haveExtra, setHaveExtra] = useState(false);
  const [wasModified, setWasModified] = useState(false);
  const [error, setError] = useState(null);

  const { usersWithFollowers: usersList } = useRecoilValue(users);
  const { activitiesType } = useRecoilValue(generic);

  const {
    isLoading,
    error: errorGetActivity,
    data,
    execute,
  } = useGetActivity();

  useLayoutEffect(() => {
    if (usersList.length === 0) {
      history.push('/users');
    }
  }, [usersList, activitiesType, history]);

  useLayoutEffect(() => {
    const id = match.params.id;
    execute(id);
  }, [match, execute]);

  useLayoutEffect(() => {
    if (data) {
      const haveExtra = activitiesType.find(
        (activityInfo) => activityInfo.id === data.type,
      );

      setActivity(data);
      setHaveExtra(haveExtra?.extra);
    }
  }, [data, activitiesType]);

  useEffect(() => {
    const error = errorGetActivity;
    if (error) {
      setError(error);
    }
  }, [errorGetActivity]);

  useEffect(() => {
    if (activity?.type) {
      const haveExtra = activitiesType.find(
        (activityInfo) => activityInfo.id === activity.type,
      );

      setHaveExtra(haveExtra?.extra);
    }
  }, [activity?.type, activitiesType]);

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
            <h1 className="title">{t('pages.activities.edit.title')}</h1>
            <Submit
              newActivity={activity}
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
                  value={activity?.type}
                  errorMsg={errorActivity?.type}
                  onChange={(value) => {
                    activitiesHandler.activitySelectHandler(
                      'type',
                      value,
                      setActivity,
                      activity,
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
                  value={activity?.date}
                  errorMsg={errorActivity?.date}
                  onChange={(event) =>
                    activitiesHandler.activityInputHandler(
                      event,
                      setActivity,
                      activity,
                    )
                  }
                  className="activity-input-format"
                />
              </div>

              {activity?.type && (
                <div className="activity-input">
                  <SelectFieldComponent
                    title={t('activities.fields.list.title')}
                    name="list"
                    placeholder={t('activities.fields.list.placeholder')}
                    value={activity?.list}
                    errorMsg={errorActivity?.list}
                    onChange={(value) => {
                      activitiesHandler.activityMultiSelectHandler(
                        'list',
                        value,
                        setActivity,
                        activity,
                      );
                      setErrorActivity({});
                      setWasModified(true);
                    }}
                    options={usersList}
                    className="activity-input-format-users"
                    isMulti={true}
                  />
                </div>
              )}

              {activity?.list?.map((activityInfo, index) => {
                let participant = usersList.find(
                  (user) => user.id === activityInfo,
                );

                if (!participant) {
                  participant = { name: '', id: index };
                }

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
                          activity.listInfo.find(
                            (user) => user.id === participant.id,
                          )?.value
                        }
                        errorMsg={errorActivity?.listInfo}
                        onChange={(event) => {
                          activitiesHandler.activityMultiInputHandler(
                            event,
                            setActivity,
                            activity,
                            participant,
                          );
                          setWasModified(true);
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
      {isLoading && <Loading />}
    </>
  );
};

export default EditActivity;
