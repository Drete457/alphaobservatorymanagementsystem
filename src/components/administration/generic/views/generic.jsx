import { useState } from 'react';
import { CForm, CButton } from '@coreui/react';
import { InputField } from 'components/administration/input';
import Buttons from 'components/administration/generic/buttons';
import genericHandler from 'helpers/generic';
import CIcon from '@coreui/icons-react';

const Generic = ({
  generic,
  type,
  title,
  inputTitle,
  inputPlaceHolder,
  isEdit,
  setIsEdit,
  setWasModified,
  genericList,
  setGeneric,
  originalData,
}) => {
  const [errorsGeneric, setErrorsGeneric] = useState([]);

  return (
    <>
      <header>
        <h1 className="title">{title}</h1>

        <Buttons
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          type={type}
          genericName={title}
          genericList={genericList}
          setGeneric={setGeneric}
          create={true}
          originalData={originalData}
        />
      </header>

      <main className="main-body">
        <CForm>
          {!isEdit[type] && (
            <>
              {generic?.map((generic, index) => {
                return (
                  <div key={index}>
                    <div className="generic-main">
                      <InputField
                        title={inputTitle}
                        name="name"
                        type="text"
                        value={generic?.name}
                        errorMsg={errorsGeneric[index]?.name}
                        className="country-input-format"
                        disabled
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {isEdit[type] &&
            generic?.map((generic, index) => {
              return (
                <div key={index}>
                  <div className="generic-main">
                    <InputField
                      title={inputTitle}
                      name="name"
                      type="text"
                      placeholder={inputPlaceHolder}
                      value={generic?.name}
                      errorMsg={errorsGeneric[index]?.name}
                      onChange={(event) => {
                        genericHandler.inputHandler(
                          setGeneric,
                          genericList,
                          type,
                          index,
                          event,
                        );
                        setWasModified(true);
                      }}
                      className="country-input-format"
                    />

                    {!generic?.id && (
                      <CButton
                        className="country-trash"
                        shape="pill"
                        variant={'ghost'}
                        size="sm"
                        color="danger"
                        onClick={() => {
                          genericHandler.genericDelete(
                            setGeneric,
                            genericList,
                            type,
                            index,
                          );
                          setWasModified(true);
                        }}
                      >
                        <CIcon name={'cil-trash'} />
                      </CButton>
                    )}
                  </div>
                </div>
              );
            })}
        </CForm>
      </main>
    </>
  );
};

export default Generic;
