import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePostActivitie } from 'hooks/activities';
import activitiesHandler from 'helpers/activities';
import Button from 'components/button';
import Loading from 'components/loading';

const Submit = ({ newActivity, setError, setErrorActivity, haveExtra }) => {
  const history = useHistory();
  const [t] = useTranslation();
  const { isLoading, error, data, execute } = usePostActivitie();

  useEffect(() => {
    if (data) {
      history.push(`/activities_table`);
    }
  }, [data, history]);

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
          onClick={() => history.push('/activities_table')}
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

              execute(newActivity);
            }
          }}
        />
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default Submit;
