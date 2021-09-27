import { CTextarea } from '@coreui/react';

const TextAreaField = ({
  name,
  rows,
  placeholder,
  value,
  onChange,
  disabled,
}) => {
  return (
    <div>
      <CTextarea
        name={name}
        type="type"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-style"
        readOnly={disabled}
      />
    </div>
  );
};

export default TextAreaField;
