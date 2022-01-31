import { memo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useTranslation } from 'react-i18next';
import homeHandler from 'helpers/users';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey(process.env.REACT_APP_AG_LICENSE);

const DynamicGrid = ({ data, fieldsTable, setGridApi }) => {
  const [t] = useTranslation();
  const fields = homeHandler.fields(t);
  const columnDefs = Array.from(fieldsTable || fields).map((field) => {
    return {
      headerName: field.label,
      field: field.key,
    };
  });

  const onGridReady = (params) => {
    setGridApi(params.api);

    const updateData = () => params.api.setRowData(data.slice(0, data.length));
    updateData();
  };

  return (
    <>
      <AgGridReact
        defaultColDef={{ sortable: true, filter: true }}
        columnDefs={columnDefs}
        pagination={true}
        onGridReady={onGridReady}
        rowData={data}
      ></AgGridReact>
    </>
  );
};

export default memo(DynamicGrid);
