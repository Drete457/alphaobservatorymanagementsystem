import React from 'react';
import { CButton } from '@coreui/react';

const Button = ({ name, isDanger, onClick, className }) => {
  return (
    <CButton
      className={className}
      variant="ghost"
      color={isDanger ? 'danger' : 'primary'}
      size="nm"
      onClick={onClick}
    >
      {name}
    </CButton>
  );
};

export default Button;
