import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from 'components/button';

const View = ({ user, active }) => {
  const history = useHistory();
  const [t] = useTranslation();

  return (
    <>
      <div className="user-submit-buttons mt-3">
        <Button
          name={t('btn.create-edit.cancel')}
          isDanger={true}
          onClick={() => history.push('/users/')}
        />

        <Button
          name={t('btn.create-edit.edit')}
          isDanger={false}
          onClick={() => history.push(`/user/edition/${active}/${user.id}`)}
        />
      </div>
    </>
  );
};

export default View;
