import { CCardBody, CCardHeader } from '@coreui/react';

const Card = ({ card, userList }) => {
  const trainer = userList.find((user) => user.id === card.trainer)?.name;
  return (
    <>
      <CCardHeader>{card?.name}</CCardHeader>
      <CCardBody>
        {trainer && <div>{card?.date + ' ' + trainer}</div>}
        <div className="text-line">{card?.body}</div>
      </CCardBody>
    </>
  );
};

export default Card;
