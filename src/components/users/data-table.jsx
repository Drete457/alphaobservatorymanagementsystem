import { CDataTable } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import homeHandler from 'helpers/users';
import Button from 'components/button';
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
      scopedSlots={{
        view: (item) => {
          return (
            <td>
              <Button
                name={t('btn.view')}
                onClick={() => history.push(`/user/view/${item.id}`)}
                className="home-button"
              />
            </td>
          );
        },
      }}
    />
  );
};

export default DataTable;
