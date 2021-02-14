import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CTextarea,
  CRow,
  CInputCheckbox,
} from '@coreui/react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserDetail = ({ match }) => {
  const history = useHistory();

  const [t] = useTranslation();

  return <>users page</>;
};

export default UserDetail;
