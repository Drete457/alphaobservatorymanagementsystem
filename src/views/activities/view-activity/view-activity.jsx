import { useState, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { listUsers } from 'state/atoms';
import { CForm } from '@coreui/react';
import { InputField } from 'components/activities/input';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import activitiesTypes from 'assets/mocks/activities.js';
import useGetActivity from 'hooks/activities/useGetActivity';

const ViewActivity = ({ match }) => {
  const history = useHistory();
  const [t] = useTranslation();

  const [haveExtra, setHaveExtra] = useState(false);

  const userList = useRecoilValue(listUsers);

  const { isLoading, error, data, execute } = useGetActivity();

  useLayoutEffect(() => {
    if (userList.length === 0) {
      history.push('/users');
    }
  }, [userList, history]);

  useLayoutEffect(() => {
    const id = match.params.id;
    execute(id);
  }, [match, execute]);

  useLayoutEffect(() => {
    if (data) {
      const haveExtra = activitiesTypes.find(
        (activity) => activity.id === data.type,
      );

      setHaveExtra(haveExtra?.extra);
    }
  }, [data]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <>
          <header>
            <h1 className="title">{t('pages.activities.view.title')}</h1>
          </header>

          <main className="main-body">
            <CForm>
              <div className="activity-input">
                <InputField
                  title={t('activities.fields.type.title')}
                  name="type"
                  type="text"
                  value={data?.type}
                  className="activity-input-format"
                  disabled
                />

                <InputField
                  title={t('activities.fields.date.title')}
                  name="date"
                  type="date"
                  value={data?.date}
                  className="activity-input-format"
                  disabled
                />
              </div>

              {data.type && (
                <div className="activity-input">
                  <InputField
                    title={t('activities.fields.list.title')}
                    name="list"
                    type="text"
                    value={data?.list}
                    className="activity-input-format-users"
                    disabled
                  />
                </div>
              )}

              {Array.from(data.list).map?.((activity) => {
                const participant = userList.find(
                  (user) => user.id === activity,
                );
                return (
                  <div className="activity-input" key={participant.id}>
                    {haveExtra ? (
                      <InputField
                        title={participant.name}
                        name="listInfo"
                        type="text"
                        value={
                          data.listInfo.find(
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
