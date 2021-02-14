import React from 'react';
import { CButton } from '@coreui/react';

const Button = ({ name, isDanger, onClick }) => {
  return (
    <CButton
      className="home-button"
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
