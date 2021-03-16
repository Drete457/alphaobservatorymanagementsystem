import { CCardBody, CCardHeader } from '@coreui/react';

const Card = ({ card, userList }) => {
  return (
    <>
      <CCardHeader>{card?.name}</CCardHeader>
      <CCardBody>
        <div>{card?.date + ' ' + card?.trainer}</div>
        <div className="text-line">{card?.body}</div>
      </CCardBody>
    </>
  );
};

export default Card;
