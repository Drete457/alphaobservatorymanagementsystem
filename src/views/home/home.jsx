import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUsers } from '../../hooks/users';
import { CButton, CDataTable } from '@coreui/react';

const fields = (t) => {
  return [
    { key: 'name', label: t('user.fields.name') },
    { key: 'followed', label: t('user.fields.followed') },
    { key: 'country', label: t('user.fields.country') },
    { key: 'contacted', label: t('user.fields.contacted') },
    { key: 'training', label: t('user.fields.training') },
    { key: 'second', label: t('user.fields.second') },
    { key: 'introductionOption', label: t('user.fields.introduction.option') },
    { key: 'introductionDate', label: t('user.fields.introduction.date') },
    { key: 'community', label: t('user.fields.community') },
    { key: 'surveyDate', label: t('user.fields.survey.date') },
    { key: 'ambitEntry', label: t('user.fields.ambit.entry') },
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

      <CButton to="/user">user</CButton>

      <CDataTable
        addTableClasses="home-table"
        items={users}
        fields={fields(t)}
        hover
        striped
        sorter
        size="sm"
        responsive
        isLoading={isLoading}
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
