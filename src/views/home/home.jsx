import React, { useState, useEffect } from 'react';
import { CButton, CDataTable } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useGetUsers } from '../../hooks/users';

import Button from '../../containers/button';

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
  const history = useHistory();

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
      <header>
        <h1 className="home-title">{t('pages.home.title')}</h1>
      </header>

      <main>
        <nav className="home-nav">
          <Button
            name={t('btn.create.user')}
            onClick={() => history.push(`/user/new_user`)}
            className="home-button"
          />
        </nav>

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
                  <Button
                    name={t('btn.view')}
                    onClick={() => history.push(`/user/${item.id}`)}
                    className="home-button"
                  />
                </td>
              );
            },
          }}
        />
      </main>
    </>
  );
};

export default Home;
