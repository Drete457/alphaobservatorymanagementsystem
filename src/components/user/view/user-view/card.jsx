import { CCardBody, CCardHeader } from '@coreui/react';

const Card = ({ card, userList, cardBasicInfo }) => {
  const trainers = card?.trainer?.map(
    (value) => ' ' + userList.find((user) => user.id === value)?.name,
  );

  return (
    <>
      <CCardHeader>{cardBasicInfo?.name}</CCardHeader>
      <CCardBody>
        {trainers && <div>{card?.date + ' ' + trainers}</div>}
        <div className="text-line">{card?.body}</div>
      </CCardBody>
    </>
  );
};

export default Card;
