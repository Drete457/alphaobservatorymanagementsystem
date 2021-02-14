import React, { useState, useEffect } from 'react';
import { CLabel } from '@coreui/react';
import Select from 'react-select';

const SelectFieldComponent = ({
  name,
  placeholder,
  title,
  value,
  errorMsg,
  onChange,
  options,
  isError,
}) => {
  const [current, setCurrent] = useState('');

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  return (
    <>
      <CLabel htmlFor={name}>{title}</CLabel>
      <Select
        isClearable
        name={name}
        id={name}
        placeholder={placeholder}
        value={current}
        options={options}
        autoComplete="off"
        invalid={isError}
        required
        onChange={(event) => {
          setCurrent(event);
          onChange(event);
        }}
      />
      {isError && <p className="invalid">{errorMsg}</p>}
    </>
  );
};

export default SelectFieldComponent;
