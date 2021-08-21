import { CLabel, CInput } from '@coreui/react';

const InputField = ({
  title,
  name,
  id,
  placeholder,
  type,
  value,
  errorMsg,
  onChange,
  className,
  disabled,
}) => {
  const isInvalid = errorMsg;

  return (
    <div className={className}>
      <CLabel htmlFor={name}>{title}</CLabel>
      {disabled ? (
        <CInput
          defaultValue={value}
          className="input-style"
          readOnly={disabled}
        />
      ) : (
        <CInput
          type={type}
          name={name}
          id={id}
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
