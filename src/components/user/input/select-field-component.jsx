import React, { useState, useLayoutEffect } from 'react';
import { CLabel } from '@coreui/react';
import Select from 'react-select';

const createList = (options) => {
  const optionsList = Array.from(options)?.map((value) => {
    return { label: value, value: value };
  });

  return optionsList;
};

const createValue = (value) => {
  return { label: value, value: value };
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
  isMulti,
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

  const [current, setCurrent] = useState(null);
  const optionList = createList(options);
  const isInvalid = errorMsg ? true : false;

  useLayoutEffect(() => {
    if (value && !isMulti) {
      const valueFormat = createValue(value);
      setCurrent(valueFormat);
    }

    if (value && isMulti) {
      const valueList = value.map((social) => createValue(social));
      setCurrent(valueList);
    }
  }, [value, isMulti]);

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
        onChange={(event) => {
          setCurrent(event);
          onChange(event);
        }}
        className="select-style"
        isMulti={isMulti}
      />
      {isInvalid && <p className="user-input-error">{errorMsg}</p>}
    </div>
  );
};

export default SelectFieldComponent;
