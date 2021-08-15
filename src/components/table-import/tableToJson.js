import xlsxFile from 'read-excel-file';

const tableToJson = (event) => {
  const file = event.target.files[0];

  //read excel file
  const dataFilter = xlsxFile(file).then((rows) => {
    const rowsFilter = rows.filter((row, index) => {
      if (index > 1) {
        return row;
      }

      return null;
    });

    return rowsFilter;
  });

  return dataFilter;
};

export default tableToJson;
