import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//import uniqueId from 'helpers/id-generator';
import Button from 'components/button';

const Buttons = ({
  isEdit,
  setIsEdit,
  type,
  genericName,
  genericList,
  setGeneric,
  create,
}) => {
  const history = useHistory();
  const [t] = useTranslation();

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

      {isEdit[type] && (
        <div className="user-submit-buttons">
          <Button
            name={t('btn.create-edit.cancel')}
            isDanger={true}
            onClick={() => {}}
          />

          <Button
            name={t('btn.create-edit.save')}
            isDanger={false}
            onClick={() => {}}
          />

          <Button
            name={t('btn.create-edit.generic') + genericName}
            isDanger={false}
            onClick={() => {
              const newArray = [...genericList[type]];

              create
                ? newArray.push({ id: '', name: '' })
                : newArray.push(create);

              setGeneric({
                ...genericList,
                [type]: newArray,
              });
            }}
          />
        </div>
      )}
    </>
  );
};

export default Buttons;
