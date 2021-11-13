import { useState } from 'react';
import { CDataTable } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import homeHandler from 'helpers/users';
import CIcon from '@coreui/icons-react';

const DataTable = ({ users }) => {
  const [t] = useTranslation();
  const history = useHistory();
  const [globalHour, setGlobalHour] = useState('');

  //start the clock
  if (globalHour === '') {
    homeHandler.minuteUpdate(setGlobalHour);
  }

  //update clock 20 seconds
  setInterval(homeHandler.minuteUpdate, 20000, setGlobalHour);

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
      footer
      hover
      striped
      sorter
      responsive
      itemsPerPageSelect
      itemsPerPage={25}
      pagination={true}
      noItemsViewSlot={
        <div className="text-center my-5">
          <h2>
            {t('pages.users.no-info')}
            <CIcon width="30" name="cilBan" className="text-danger mb-2" />
          </h2>
        </div>
      }
      onRowClick={(item) => history.push(`/user/view/${item.id}`)}
      scopedSlots={{
        timezone: (item) => {
          let hour = '';

          if (item.timezone && globalHour) {
            hour = globalHour.tz(item.timezone).format('HH:mm');
          }

          return <td>{hour}h</td>;
        },
      }}
    />
  );
};

export default DataTable;
