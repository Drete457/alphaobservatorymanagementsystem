import { useState } from 'react';
import { CForm, CButton } from '@coreui/react';
import { InputField } from 'components/administration/input';
import CIcon from '@coreui/icons-react';

const Generic = ({
  generic,
  type,
  title,
  inputTitle,
  inputPlaceHolder,
  isEdit,
  setWasModified,
}) => {
  const [errorsGeneric, setErrorsGeneric] = useState([]);

  return (
    <>
      <header>
        <h1 className="title">{title}</h1>
      </header>

      <main className="main-body">
        <CForm>
          {!isEdit[type] && (
            <>
              {generic?.map((activity, index) => {
                return (
                  <div key={index}>
                    <div className="generic-main">
                      <InputField
                        title={inputTitle}
                        name="name"
                        type="text"
                        value={activity?.name}
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
            generic?.map((activity, index) => {
              return (
                <div key={index}>
                  <div className="generic-main">
                    <InputField
                      title={inputTitle}
                      name="name"
                      type="text"
                      placeholder={inputPlaceHolder}
                      value={activity?.name}
                      errorMsg={errorsGeneric[index]?.name}
                      onChange={(event) => {
                        setWasModified(true);
                      }}
                      className="country-input-format"
                    />

                    {!activity && (
                      <CButton
                        className="country-trash"
                        shape="pill"
                        variant={'ghost'}
                        size="sm"
                        color="danger"
                        onClick={() => {
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