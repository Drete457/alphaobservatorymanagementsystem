import React from 'react';
import { CLabel, CInput, CInvalidFeedback } from '@coreui/react';

const InputField = ({
  name,
  placeholder,
  type,
  title,
  value,
  errorMsg,
  onChange,
  isError,
}) => {
  return (
    <>
      <CLabel htmlFor={name}>{title}</CLabel>
      <CInput
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        autoComplete="off"
        invalid={isError}
        required
        onChange={(event) => {
          onChange(event);
        }}
        value={value}
      />
      <CInvalidFeedback>{errorMsg}</CInvalidFeedback>
    </>
  );
};

export default InputField;
