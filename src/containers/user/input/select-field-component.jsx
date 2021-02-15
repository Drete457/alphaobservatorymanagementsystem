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
  className,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#2f4246' : '#2f4246',
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(41,66,70, 1)' : '#2f4246',
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isDisabled
        ? null
        : state.isSelected
        ? '#00008b'
        : state.isFocused
        ? '#00008b'
        : null,
    }),
  };

  const [current, setCurrent] = useState('');

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  return (
    <div className={className}>
      <CLabel htmlFor={name}>{title}</CLabel>
      <Select
        styles={customStyles}
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
        className="select-style"
      />
      <CInvalidFeedback>{errorMsg}</CInvalidFeedback>
    </div>
  );
};

export default SelectFieldComponent;
