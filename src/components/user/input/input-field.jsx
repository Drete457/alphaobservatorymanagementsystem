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
  disabled,
}) => {
  const isInvalid = errorMsg ? true : false;

  return (
    <div className={className}>
      <CLabel htmlFor={name}>{title}</CLabel>
      {disabled ? (
        <CInput
          defaultValue={value}
          className="input-style"
          disabled={disabled}
        />
      ) : (
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
      )}
      {isInvalid && <p className="user-input-error">{errorMsg}</p>}
    </div>
  );
};

export default InputField;
