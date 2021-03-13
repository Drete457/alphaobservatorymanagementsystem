import { CCol, CFormGroup, CInput, CLabel } from '@coreui/react';

const InputDetailView = ({ title1, value1, title2, value2, md }) => {
  return (
    <CFormGroup row className="mb-4">
      <CCol md={md}>
        <CLabel>{title1}</CLabel>
        <CInput value={value1} disabled />
      </CCol>
      {title2 && (
        <CCol md={md}>
          <CLabel>{title2}</CLabel>
          <CInput value={value2} disabled />
        </CCol>
      )}
    </CFormGroup>
  );
};

export default InputDetailView;
