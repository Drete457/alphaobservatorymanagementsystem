import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import activitiesHandler from 'helpers/activities';
import Button from 'components/button';

const Submit = ({ newActivity, setErrorActivity, haveExtra, execute }) => {
  const history = useHistory();
  const [t] = useTranslation();

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
              console.log('ups');
              // execute(newActivity);
              //history.push('/activities_table');
            }
          }}
        />
      </div>
    </>
  );
};

export default Submit;
