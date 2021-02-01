import React, { useState, useEffect } from 'react';
import { useGetUsers, usePostUser, useDeleteUser } from '../../hooks/users';
import { CButton, CDataTable } from '@coreui/react';

const fields = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  {
    key: 'delete',
    label: '',
    _style: { width: '5%' },
    sorter: false,
    filter: false,
  },
];

const Home = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const { data, execute } = useGetUsers();
  const { data: postData, execute: postExecute } = usePostUser();
  const { execute: deleteExecute } = useDeleteUser();

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    if (data) {
      const arrayData = Object.values(data);

      setUsers(arrayData);
    }
  }, [data, postData]);

  return (
    <>
      <form className="ml-5">
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          value={user.name}
          onChange={(event) =>
            setUser({
              name: event.target.value,
              email: user.email,
            })
          }
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required
          placeholder="seuemail@dominio.com"
          value={user.email}
          onChange={(event) =>
            setUser({
              name: user.name,
              email: event.target.value,
            })
          }
        />

        <input
          type="submit"
          value="Enviar formulário"
          onClick={() => {
            postExecute(user);
            execute();
            setUser({
              name: '',
              email: '',
            });
          }}
        />
      </form>

      <CDataTable
        addTableClasses="table-users"
        items={users}
        fields={fields}
        hover
        striped
        sorter
        size="sm"
        responsive
        scopedSlots={{
          delete: (item) => {
            return (
              <td className="py-2">
                <CButton
                  className="d-flex justify-content-center"
                  variant="ghost"
                  color="primary"
                  size="nm"
                  onClick={() => {
                    deleteExecute(item);
                    execute();
                  }}
                >
                  Delete
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
