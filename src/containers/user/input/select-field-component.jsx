import React, { useState, useEffect } from 'react';
import { CLabel, CInvalidFeedback } from '@coreui/react';
import Select from 'react-select';

const createList = (options) => {
  const optionsList = Array.from(options)?.map((value) => {
    return { label: value, value: value };
  });

  return optionsList;
};

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
      boxShadow: state.isFocused
        ? '0 0 0 0.2rem rgba(0, 0, 139, 1)'
        : '#2f4246',
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isDisabled
        ? null
        : state.isSelected
        ? '#5f5996'
        : state.isFocused
        ? '#89d6f5'
        : null,
    }),
  };

  const [current, setCurrent] = useState('');
  const optionList = createList(options);

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  return (
    <div className={className}>
      <CLabel htmlFor={name}>{title}</CLabel>
      <Select
        styles={customStyles}
        name={name}
        placeholder={placeholder}
        value={current}
        options={optionList}
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
