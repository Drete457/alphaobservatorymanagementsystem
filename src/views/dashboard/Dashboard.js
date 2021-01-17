import React from 'react';
import { useRecoilValue } from 'recoil';
import { user, token } from '../../state/atoms';

const Dashboard = () => {
  const isToken = useRecoilValue(token);
  const isUser = useRecoilValue(user);

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

export default Dashboard;
