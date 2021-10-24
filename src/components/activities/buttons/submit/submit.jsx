import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { user as userInfo } from 'state/atoms';
import { useGetLast30DaysActivities, usePostActivity } from 'hooks/activities';
import { useGetUsers, usePostUser } from 'hooks/users';
import activitiesHandler from 'helpers/activities';
import dateGenerator from 'helpers/date-generator';
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
  const isUser = useRecoilValue(userInfo);
  const { isLoading, error, data, execute } = usePostActivity();
  const { data: activitiesData, execute: getActivities } =
    useGetLast30DaysActivities();
  const { data: usersData, execute: getUsers } = useGetUsers();
  const { execute: postUser } = usePostUser();

  const [a, seta] = useState(false);

  useEffect(() => {
    if (a && activitiesData) {
      console.log(a, activitiesData);
      /*  const usersListArray = Object.values(usersData);

      newActivity.list.forEach?.((userId) => {
        const newUser = usersListArray.find((value) => value.id === userId);

        if (!newUser?.firstActivity) {
          newUser.firstActivity = newActivity.date;

          //postUser(newUser);
        }
      }); */

      //history.push(`/activities/activities_table`);
    }
  }, [
    newActivity,
    data,
    usersData,
    activitiesData,
    postUser,
    history,
    setWasModified,
    a,
  ]);

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

              if (!newActivity?.lastModification) {
                newActivity.lastModification = [];
              }

              newActivity.lastModification.push({
                email: isUser.email,
                date: dateGenerator(),
              });

              //get the day and month 30 day ago
              const today = new Date();
              const priorDate = new Date().setDate(today.getDate() - 30);
              console.log(priorDate);
              getActivities(priorDate);
              //getUsers();
              seta(true);
              //execute(newActivity);
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
