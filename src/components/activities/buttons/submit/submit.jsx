import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePostActivitie } from 'hooks/activities';
import { useGetUsers, usePostUser } from 'hooks/users';
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
  const { execute: postUser } = usePostUser();

  useEffect(() => {
    if (usersData) {
      const usersListArray = Object.values(usersData);

      newActivity.list.forEach?.((userId) => {
        const newUser = usersListArray.find((value) => value.id === userId);

        if (!newUser?.firstActivity) {
          newUser.firstActivity = newActivity.date;

          postUser(newUser);
        }
      });

      history.push(`/activities/activities_table`);
    }
  }, [newActivity, data, usersData, postUser, history, setWasModified]);

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
              execute(newActivity);
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
