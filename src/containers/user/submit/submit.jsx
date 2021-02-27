import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../button';

const Submit = ({ cancelPage, user, setErrorMsg }) => {
  const history = useHistory();
  const [t] = useTranslation();

  return (
    <div className="user-submit-buttons">
      <Button
        name="Cancel"
        isDanger={true}
        onClick={() => history.push(cancelPage)}
      />

      <Button name="Submit" isDanger={false} />
    </div>
  );
};

export default Submit;
