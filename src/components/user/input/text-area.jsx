import { CTextarea } from '@coreui/react';

const TextAreaField = ({ placeholder, value, onChange, disabled }) => {
  return (
    <div>
      <CTextarea
        type="type"
        rows="8"
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
