import { CTextarea } from '@coreui/react';

const TextAreaField = ({ rows, placeholder, value, onChange, disabled }) => {
  return (
    <div>
      <CTextarea
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
