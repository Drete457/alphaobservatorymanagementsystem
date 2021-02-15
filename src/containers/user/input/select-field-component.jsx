import React, { useState, useEffect } from 'react';
import { CLabel, CInvalidFeedback } from '@coreui/react';
import Select from 'react-select';

const SelectFieldComponent = ({
  title,
  name,
  placeholder,
  value,
  errorMsg,
  onChange,
  options,
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
        placeholder={placeholder}
        value={current}
        options={options}
        autoComplete="off"
        invalid={errorMsg ? true : false}
        onChange={(event) => {
          setCurrent(event);
          onChange(event);
        }}
      />
      <CInvalidFeedback>{errorMsg}</CInvalidFeedback>
    </>
  );
};

export default SelectFieldComponent;
