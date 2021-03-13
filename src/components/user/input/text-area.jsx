import { CTextarea } from '@coreui/react';

const TextAreaField = ({
  placeholder,
  value,
  errorMsg,
  onChange,
  disabled,
}) => {
  const isInvalid = errorMsg ? true : false;

  return (
    <div>
      <CTextarea
        type="type"
        rows="8"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-style"
        disabled={disabled}
      />
    </div>
  );
};

export default TextAreaField;
