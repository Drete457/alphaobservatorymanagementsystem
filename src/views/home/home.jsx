import React from 'react';
import { useRecoilValue } from 'recoil';
import { user, token, api } from '../../state/atoms';

const Home = () => {
  const isToken = useRecoilValue(token);
  const isUser = useRecoilValue(user);
  const comunication = useRecoilValue(api);
  console.log(isUser);
  return (
    <>
      <img src={isUser.photo} alt="user display" />
      <p>Name: {isUser.name}</p>
      <p>Email: {isUser.email}</p>
      <p>Create: {isUser.create}</p>
      <p>Last Login: {isUser.last}</p>
      <p>Token: {isToken}</p>
    </>
  );
};

export default Home;
