import { CDataTable } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import activitiesHandler from './';
import Button from 'components/button';
import CIcon from '@coreui/icons-react';

const DataTable = ({ activities, isLoading }) => {
  const [t] = useTranslation();
  const history = useHistory();

  return (
    <CDataTable
      addTableClasses="home-table"
      items={activities}
      fields={activitiesHandler.fields(t)}
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
            {t('pages.activities.no-info')}
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
                onClick={() => history.push(`/activities/view/${item.id}`)}
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
