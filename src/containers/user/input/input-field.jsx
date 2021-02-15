import React from 'react';
import { CLabel, CInput, CInvalidFeedback } from '@coreui/react';

const InputField = ({
  title,
  name,
  placeholder,
  type,
  value,
  errorMsg,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      <CLabel htmlFor={name}>{title}</CLabel>
      <CInput
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        autoComplete="off"
        invalid={errorMsg ? true : false}
        onChange={(event) => {
          onChange(event);
        }}
        value={value}
      />
      <CInvalidFeedback>{errorMsg}</CInvalidFeedback>
    </div>
  );
};

export default InputField;
