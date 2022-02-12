import { useEffect } from 'react';
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
  const isAlphaCafeActivity =
    newActivity?.type ===
    'b6fddec71394-0fc4f603-af3b986f-026fa186-b0f57c47439ac15c';

  useEffect(() => {
    if (data && usersData && activitiesData) {
      const usersListArray = Object.values(usersData);

      usersListArray.forEach?.((user) => {
        const newUser = { ...user };
        const findUserOnTheActivityList = newActivity.list.find(
          (value) => value === user.id,
        );
        let wasChange = false;

        //only alpha cafe can be the first activity
        if (
          findUserOnTheActivityList &&
          !newUser?.firstActivity &&
          isAlphaCafeActivity
        ) {
          newUser.firstActivity = newActivity.date;
          wasChange = true;
        }

        if (wasChange) {
          postUser(newUser);
        }
      });

      history.push(`/activities/activities_table`);
    }
  }, [
    newActivity,
    data,
    usersData,
    activitiesData,
    postUser,
    history,
    setWasModified,
    isAlphaCafeActivity,
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

              //get the day and month 31 day ago
              const today = new Date();
              const priorDate = activitiesHandler.subtractDaysFormat(today, 31);
              const weeks = activitiesHandler.weeksBetweenDates(
                priorDate,
                today,
              );

              if (weeks.length > 4) {
                weeks.shift();
              }

              getActivities(weeks[0]);
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
