import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePostActivitie } from 'hooks/activities';
import { useGetUsers } from 'hooks/users';
import activitiesHandler from 'helpers/activities';
import Button from 'components/button';
import Loading from 'components/loading';

const Submit = ({
  newActivity,
  setError,
  setErrorActivity,
  haveExtra,
  setWasModified,
}) => {
  const history = useHistory();
  const [t] = useTranslation();
  const { isLoading, error, data, execute } = usePostActivitie();
  const { data: usersData, execute: getUsers } = useGetUsers();

  useEffect(() => {
    if (usersData) {
      console.log(newActivity);
      console.log('completo');
      console.log(usersData);
      //history.push(`/activities/activities_table`);
    }
  }, [newActivity, data, usersData, history, setWasModified]);

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [setError, error]);

  return (
    <>
      <div className="user-submit-buttons">
        <Button
          name={t('btn.create-edit.cancel')}
          isDanger={true}
          onClick={() => history.push('/activities/activities_table')}
        />
        <Button
          name={t('btn.create-edit.submit')}
          isDanger={false}
          onClick={() => {
            if (
              !activitiesHandler.validateActivities(
                newActivity,
                setErrorActivity,
                haveExtra,
                t,
              )
            ) {
              if (!haveExtra) {
                newActivity.listInfo = [];
              }

              getUsers();
              // execute(newActivity);
              setWasModified(false);
            }
          }}
        />
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default Submit;
