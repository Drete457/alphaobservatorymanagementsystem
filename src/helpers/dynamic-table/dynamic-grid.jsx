import { memo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useTranslation } from 'react-i18next';
import homeHandler from 'helpers/users';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('true');

const DynamicGrid = ({ data, fieldsTable }) => {
  const [t] = useTranslation();
  const fields = homeHandler.fields(t);
  const columnDefs = Array.from(fieldsTable || fields).map((field) => {
    return {
      headerName: field.label,
      field: field.key,
    };
  });

  return (
    <>
      <AgGridReact
        defaultColDef={{ sortable: true, filter: true }}
        columnDefs={columnDefs}
        rowData={data}
        pagination={true}
        getRowNodeId={(val) => console.log(val)}
      ></AgGridReact>
    </>
  );
};

export default memo(DynamicGrid);
