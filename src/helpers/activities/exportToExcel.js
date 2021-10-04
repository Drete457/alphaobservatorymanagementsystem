import exportFromJSON from 'export-from-json';

const download = (data) => {
  const fileName = 'alphaList';
  const exportType = 'xls';

  exportFromJSON({ data, fileName, exportType });
};

const exportToExcel = (data) => {
  download(data);
};

export default exportToExcel;
