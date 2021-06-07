import exportFromJSON from 'export-from-json';

const fileName = 'alphaList';
const exportType = 'xls';

const exportToExcel = (data) => {
  exportFromJSON({ data, fileName, exportType });
};

export default exportToExcel;
