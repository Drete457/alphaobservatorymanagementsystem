import React, { useState, useEffect } from 'react';
import { useGetUser, usePostUser } from '../../hooks/users';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    username: '',
    email: '',
  });
  const { data, execute } = useGetUser();
  const { execute: postExecute } = usePostUser();

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    if (data) {
      setUsers([data]);
    }
  }, [data]);

  return (
    <>
      <form className="ml-5">
        <label htmlFor="username">Nome</label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(event) =>
            setUser({
              username: event.target.value,
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
              username: user.username,
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
              username: '',
              email: '',
            });
          }}
        />
      </form>

      {users[0]?.map((user, index) => {
        return (
          <div key={index} className="ml-5">
            <p key={index + user.username}>{user.username}</p>
            <p key={index + user.email}>{user.email}</p>
          </div>
        );
      })}
    </>
  );
};

export default Home;
