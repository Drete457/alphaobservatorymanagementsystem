import { useState, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { users, generic } from 'state/atoms';
import { CForm } from '@coreui/react';
import { useGetActivity } from 'hooks/activities';
import { InputField } from 'components/activities/input';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import View from 'components/activities/buttons/view';

const ViewActivity = ({ match }) => {
  const history = useHistory();
  const [t] = useTranslation();

  const [activity, setActivity] = useState({});
  const [userListFilter, setUserListFilter] = useState('');
  const [activityType, setActivityType] = useState('');
  const [haveExtra, setHaveExtra] = useState(false);

  const { usersWithFollowers: usersList } = useRecoilValue(users);
  const { activitiesType } = useRecoilValue(generic);

  const { isLoading, error, data, execute } = useGetActivity();

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
        (activity) => activity.id === data.type,
      );
      const userListNames = data?.list.map((userId) => {
        const participant = usersList.find((user) => user.id === userId);

        return ' ' + participant.name;
      });

      setActivity(data);
      setUserListFilter(userListNames);
      setActivityType(haveExtra?.name);
      setHaveExtra(haveExtra?.extra);
    }
  }, [data, usersList, activitiesType]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <>
          <header>
            <h1 className="title">{t('pages.activities.view.title')}</h1>
            <View activity={activity} />
          </header>

          <main className="main-body">
            <CForm>
              <div className="activity-input">
                <InputField
                  title={t('activities.fields.type.title')}
                  name="type"
                  type="text"
                  value={activityType}
                  className="activity-input-format"
                  disabled
                />

                <InputField
                  title={t('activities.fields.date.title')}
                  name="date"
                  type="date"
                  value={activity?.date}
                  className="activity-input-format"
                  disabled
                />
              </div>

              {activity?.type && (
                <div className="activity-input">
                  <InputField
                    title={t('activities.fields.list.title')}
                    name="list"
                    type="text"
                    value={userListFilter}
                    className="activity-input-format-users"
                    disabled
                  />
                </div>
              )}

              {activity?.list?.map((userId, index) => {
                const participant = usersList.find(
                  (user) => user.id === userId,
                );

                return (
                  <div className="activity-input" key={participant.id}>
                    {haveExtra ? (
                      <InputField
                        title={participant.name}
                        name="listInfo"
                        id={index}
                        type="text"
                        value={
                          activity.listInfo?.find?.(
                            (user) => user.id === participant.id,
                          )?.value
                        }
                        className="activity-input-format"
                        disabled
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
          {isLoading && <Loading />}
        </>
      )}
    </>
  );
};

export default ViewActivity;
