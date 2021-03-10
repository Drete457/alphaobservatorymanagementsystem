import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../button';

const View = ({ cancelPage, user }) => {
  const history = useHistory();
  const [t] = useTranslation();

  return (
    <>
      <div className="user-submit-buttons">
        <Button
          name={t('btn.create-edit.cancel')}
          isDanger={true}
          onClick={() => history.push(cancelPage)}
        />

        <Button
          name={t('btn.create-edit.view')}
          isDanger={false}
          onClick={() => history.push(`/user/edition/${user.id}`)}
        />
      </div>
    </>
  );
};

export default View;
