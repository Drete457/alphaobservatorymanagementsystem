import { useState, useRef } from 'react';
import { CButton } from '@coreui/react';

const ProfilePage = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const inputFile = useRef(null);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  return (
    <>
      <input
        type="file"
        name="upload"
        ref={inputFile}
        accept="application/pdf"
        className="sr-only"
        onChange={(event) => {
          const file = URL.createObjectURL(event.target.files[0]);
          setPdfFile(file);
        }}
      />
      <CButton
        type="button"
        color="primary"
        variant="ghost"
        className="mt-4"
        onClick={onButtonClick}
      >
        Teste
      </CButton>
      <embed
        src={pdfFile}
        style={{ width: '100%', minHeight: '30rem', border: 'none' }}
      />
    </>
  );
};

export default ProfilePage;
