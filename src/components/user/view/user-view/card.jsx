import { CCardBody, CCardHeader } from '@coreui/react';

const Card = ({ card, userList, cardBasicInfo, t }) => {
  const trainers = card?.trainer?.map(
    (value) => ' ' + userList.find((user) => user.id === value)?.name,
  );

  return (
    <>
      <CCardHeader>{cardBasicInfo?.name}</CCardHeader>
      <CCardBody>
        {trainers && <div>{card?.date + ' ' + trainers}</div>}
        {card?.reservation && (
          <div>{`${card?.reservation} ${t(
            'user.fields.cards.reservation',
          )}`}</div>
        )}
        <div className="text-line">{card?.body}</div>
      </CCardBody>
    </>
  );
};

export default Card;
