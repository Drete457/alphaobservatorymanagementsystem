import { CDataTable } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import CIcon from '@coreui/icons-react';

const collaboratorsWithActivities = (list) => {
  const newUserWithActivities = [];

  if (list.length > 0) {
    list.forEach?.((user) => {
      if (user.numberOfActivities !== 0) {
        newUserWithActivities.push(user);
      }
    });
  }

  return newUserWithActivities;
};

const DataTable = ({
  fields,
  list,
  isLoading,
  setRegisteredNumber,
  setTabletoExcel,
}) => {
  const [t] = useTranslation();

  return (
    <CDataTable
      addTableClasses="users-table"
      items={collaboratorsWithActivities(list)}
      fields={fields}
      columnFilter
      tableFilter
      footer
      hover
      striped
      sorter
      size="sm"
      responsive
      itemsPerPageSelect
      itemsPerPage={25}
      pagination={true}
      isLoading={isLoading}
      onFilteredItemsChange={(val) => {
        setTabletoExcel(val);
        setRegisteredNumber(val.length);
      }}
      //onColumnFilterChange={(val) => console.log('new column filter:', val)}
      noItemsViewSlot={
        <div className="text-center my-5">
          <h2>
            {t('pages.activities.no-info')}
            <CIcon width="30" name="cilBan" className="text-danger mb-2" />
          </h2>
        </div>
      }
    />
  );
};

export default DataTable;
