import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from 'components/button';

const View = ({ activity }) => {
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
          name={t('btn.create-edit.edit')}
          isDanger={false}
          onClick={() => history.push(`/activities_table/edit/${activity.id}`)}
        />
      </div>
    </>
  );
};

export default View;
