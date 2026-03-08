import { useState, useLayoutEffect } from 'react';
import { CLabel } from '@coreui/react';
import Select from 'react-select';

const createList = (options) => {
  const optionsList = Array.from(options)?.map?.((value) => {
    return { label: value.name, value: value.id };
  });

  return optionsList;
};

const createValue = (value, options) => {
  const userOptions = options.find((options) => options.id === value);
  return { label: userOptions?.name, value: userOptions?.id };
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
  isSearchable,
  required,
}) => {
  const [current, setCurrent] = useState(null);
  const optionList = createList(options);
  const isInvalid = errorMsg ? true : false;

  useLayoutEffect(() => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      setCurrent(isMulti ? [] : null);
      return;
    }

    if (value && !isMulti) {
      const valueFormat = createValue(value, options);
      setCurrent(valueFormat);
    }

    if (value && isMulti) {
      const valueList = value?.map((social) => createValue(social, options));
      setCurrent(valueList);
    }
  }, [value, isMulti, options]);

  return (
    <div className={className}>
      <CLabel htmlFor={name}>{title}</CLabel>
      <Select
        name={name}
        placeholder={placeholder}
        value={current}
        options={optionList}
        autoComplete="off"
        onChange={(event) => {
          setCurrent(event);
          if (event) {
            onChange(event);
            return;
          }

          onChange(isMulti ? [] : { label: '', value: '' });
        }}
        className="select-style"
        isMulti={isMulti}
        isSearchable={isSearchable}
        isClearable={true}
        required={required}
      />
      {isInvalid && <p className="user-input-error">{errorMsg}</p>}
    </div>
  );
};

export default SelectFieldComponent;
