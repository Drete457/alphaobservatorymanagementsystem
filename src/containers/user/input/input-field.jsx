import React from 'react';
import { CLabel, CInput } from '@coreui/react';

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
  const isInvalid = errorMsg ? true : false;

  return (
    <div className={className}>
      <CLabel htmlFor={name}>{title}</CLabel>
      <CInput
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        autoComplete="off"
        invalid={isInvalid}
        onChange={(event) => {
          onChange(event);
        }}
        value={value}
        className="input-style"
      />
      {isInvalid && <p className="user-input-error">{errorMsg}</p>}
    </div>
  );
};

export default InputField;
