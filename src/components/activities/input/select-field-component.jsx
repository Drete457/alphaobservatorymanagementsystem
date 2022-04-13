import { useState, useLayoutEffect } from 'react';
import { CLabel } from '@coreui/react';
import Select from 'react-select';

const createList = (options) => {
  const optionsList = [];
  Array.from(options)?.forEach((value) => {
    if (value.name !== 'None') {
      optionsList.push({ label: value.name, value: value.id });
    }
  });

  return optionsList;
};

const createValue = (value, options) => {
  const optionsValues = options.find((options) => options.id === value);
  return { label: optionsValues?.name, value: optionsValues?.id };
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
      background: 'rgba(255, 255, 255, 0.05)',
      borderColor: state.isFocused ? '#2f4246' : '#2f4246',
      boxShadow: state.isFocused
        ? '0 0 0 0.2rem rgba(0, 0, 139, 1)'
        : '#2f4246',
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isDisabled
        ? 'null'
        : state.isSelected
        ? '#000985'
        : state.isFocused
        ? '#4D58FF'
        : null,
    }),
    singleValue: (styles) => ({
      ...styles,
      color: '#ffffff',
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
      background: 'rgba(50, 50, 50, 1)',
      color: '#ffffff',
    }),
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: '#365581',
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: '#ffffff',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: '#ffffff',
      ':hover': {
        backgroundColor: '#3d5d89',
        color: '#ffffff',
      },
    }),
  };

  const [current, setCurrent] = useState(null);
  const optionList = createList(options);
  const isInvalid = errorMsg ? true : false;

  useLayoutEffect(() => {
    if (value && !isMulti) {
      const valueFormat = createValue(value, options);
      setCurrent(valueFormat);
    }

    if (value && isMulti) {
      const valueList = value?.map((user) => createValue(user, options));
      setCurrent(valueList);
    }
  }, [value, isMulti, options]);

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
        isSearchable={true}
        isClearable={false}
      />
      {isInvalid && <p className="user-input-error">{errorMsg}</p>}
    </div>
  );
};

export default SelectFieldComponent;
