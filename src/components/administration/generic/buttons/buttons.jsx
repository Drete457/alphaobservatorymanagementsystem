//import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//import uniqueId from 'helpers/id-generator';
import genericHandler from 'helpers/generic';
import Button from 'components/button';

const Buttons = ({
  isEdit,
  setIsEdit,
  type,
  genericName,
  genericList,
  setGeneric,
  create,
  originalData,
  setError,
  setOriginalData,
}) => {
  //const history = useHistory();
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
            onClick={() => {
              setIsEdit({
                ...isEdit,
                [type]: false,
              });

              genericHandler.genericCancel(
                setGeneric,
                genericList,
                type,
                originalData,
              );
            }}
          />

          <Button
            name={t('btn.create-edit.save')}
            isDanger={false}
            onClick={() => {
              if (
                !genericHandler.validateGeneric(genericList[type], setError, t)
              ) {
                genericHandler.genericSave(
                  setGeneric,
                  genericList,
                  type,
                  setOriginalData,
                );

                setIsEdit({
                  ...isEdit,
                  [type]: false,
                });
              }
            }}
          />

          <Button
            name={t('btn.create-edit.generic') + genericName}
            isDanger={false}
            onClick={() => {
              genericHandler.genericCreate(
                setGeneric,
                genericList,
                type,
                create,
              );
            }}
          />
        </div>
      )}
    </>
  );
};

export default Buttons;
