import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePostGeneric } from 'hooks/generic';
import uniqueId from 'helpers/id-generator';
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
  wasModified,
  setWasModified,
}) => {
  //TODO: Delete the moment security is done
  const securityIsDone = process.env.REACT_APP_IS_SECURITY_DONE === 'true';
  const [t] = useTranslation();

  const { data, execute } = usePostGeneric();

  useEffect(() => {
    if (data) {
      setWasModified(false);
    }
  }, [data, setWasModified]);

  return (
    <>
      {!isEdit[type] && securityIsDone && (
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

          {wasModified && (
            <Button
              name={t('btn.create-edit.submit')}
              isDanger={false}
              onClick={() => {
                if (
                  !genericHandler.validateGeneric(
                    genericList[type],
                    setError,
                    t,
                  ) &&
                  !Object.values(isEdit).some((value) => value === true)
                ) {
                  const newGeneric = {};

                  for (let attr in genericList) {
                    newGeneric[attr] = genericList[attr].map?.((newAttr) => {
                      if (newAttr?.id === '') {
                        newAttr.id = uniqueId();
                      }

                      newAttr.name = newAttr.name.trim();

                      return newAttr;
                    });
                  }

                  execute(newGeneric);
                }
              }}
            />
          )}
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
