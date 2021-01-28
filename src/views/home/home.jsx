import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { user, api } from '../../state/atoms';
import useGetUser from '../../hooks/users';

const Home = () => {
  const isUser = useRecoilValue(user);
  const { isLoading, error, data, execute } = useGetUser();

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    console.log('aqui');
    console.log(data);
  }, [data]);
  const comunication = useRecoilValue(api);

  useEffect(() => {
    //const leitura = comunication.database().collection('users');
    //const db = comunication.database();
    /*  let database = comunication.database();
    database.ref('users/').set({
      username: 'Joao',
      email: 'teste',
    });
    database
      .ref('users/')
      .once('value')
      .then((snapshot) => console.log(snapshot.val())); */
    /*  const teste = async () => {
      const response = comunication.database().collection('users');
      const aaa = await response.get();
      console.log(aaa.docs);
    };
    teste(); */
  }, [comunication]);

  return (
    <>
      <img src={isUser.photo} alt="user display" />
      <p>Name: {isUser.name}</p>
      <p>Email: {isUser.email}</p>
      <p>Create: {isUser.create}</p>
      <p>Last Login: {isUser.last}</p>
    </>
  );
};

export default Home;
