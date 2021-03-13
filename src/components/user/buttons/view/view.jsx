import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../../button';

const View = ({ user }) => {
  const history = useHistory();
  const [t] = useTranslation();

  return (
    <>
      <div className="user-submit-buttons">
        <Button
          name={t('btn.create-edit.cancel')}
          isDanger={true}
          onClick={() => history.goBack()}
        />

        <Button
          name={t('btn.create-edit.edit')}
          isDanger={false}
          onClick={() => history.push(`/user/edition/${user.id}`)}
        />
      </div>
    </>
  );
};

export default View;
