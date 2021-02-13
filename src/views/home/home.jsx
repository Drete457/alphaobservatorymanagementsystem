import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUsers } from '../../hooks/users';
import { CButton, CDataTable } from '@coreui/react';

const fields = (t) => {
  return [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'view',
      label: '',
      _style: { width: '5%' },
      sorter: false,
      filter: false,
    },
  ];
};

const Home = () => {
  const [t] = useTranslation();

  const [users, setUsers] = useState([]);
  const { isLoading, error, data, execute } = useGetUsers();

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    if (data) {
      const arrayData = Object.values(data);

      setUsers(arrayData);
    }
  }, [data]);

  return (
    <>
      <h1 className="home-title">{t('pages.home.title')}</h1>

      <CDataTable
        addTableClasses="table-users"
        items={users}
        fields={fields(t)}
        hover
        striped
        sorter
        size="sm"
        responsive
        scopedSlots={{
          view: (item) => {
            return (
              <td>
                <CButton
                  className="home-button"
                  variant="ghost"
                  color="primary"
                  size="nm"
                  onClick={() => {}}
                >
                  {t('btn.view')}
                </CButton>
              </td>
            );
          },
        }}
      />
    </>
  );
};

export default Home;
