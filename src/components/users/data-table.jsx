import { CDataTable } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import homeHandler from 'helpers/users';
import CIcon from '@coreui/icons-react';

const DataTable = ({ users, isLoading }) => {
  const [t] = useTranslation();
  const history = useHistory();

  //put all none to the end of the list
  const usersListSort = homeHandler.mainTableSortList(users);

  return (
    <CDataTable
      addTableClasses="users-table"
      items={usersListSort}
      fields={homeHandler.fields(t)}
      clickableRows
      columnFilter
      tableFilter
      hover
      striped
      sorter
      size="sm"
      responsive
      itemsPerPageSelect
      itemsPerPage={25}
      pagination={true}
      isLoading={isLoading}
      noItemsViewSlot={
        <div className="text-center my-5">
          <h2>
            {t('pages.users.no-info')}
            <CIcon width="30" name="cilBan" className="text-danger mb-2" />
          </h2>
        </div>
      }
      onRowClick={(item) => history.push(`/user/view/${item.id}`)}
    />
  );
};

export default DataTable;
