import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//import uniqueId from 'helpers/id-generator';
import Button from 'components/button';

const Buttons = ({ isEdit, setIsEdit, type }) => {
  const history = useHistory();
  const [t] = useTranslation();
  console.log(isEdit[type]);
  return (
    <>
      {!isEdit[type] && (
        <div className="user-submit-buttons">
          <Button
            name={t('btn.create-edit.edit')}
            isDanger={false}
            onClick={() =>
              setIsEdit({
                ...isEdit,
                [type]: true,
              })
            }
          />
        </div>
      )}
    </>
  );
};

export default Buttons;
