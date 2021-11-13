import { useState } from 'react';
import { CCardBody, CCardHeader, CButton } from '@coreui/react';
import {
  SelectFieldComponent,
  TextAreaField,
  InputField,
} from 'components/user/input';
import DeleteWarning from 'components/user/view/delete-card-warning';
import Button from 'components/button/button';
import CIcon from '@coreui/icons-react';

const newObjCard = (event, cardsTypes, selfCard) => {
  const card = cardsTypes.find((card) => {
    if (card.id === event.value) {
      return card;
    }
    return null;
  });

  const newCard = {
    ...selfCard,
    ...card,
  };

  return newCard;
};

const Card = ({
  t,
  card,
  cardBasicInfo,
  index,
  cardArray,
  setCardsArray,
  cardsTypes,
  errorMsg,
  userList,
}) => {
  const [selfCard, setSelfCard] = useState(card);
  const [edit, setEdit] = useState(false);
  const [deleteCardState, setDeleteCardState] = useState(false);
  const [haveReservation, setHaveReservation] = useState(card?.reservation);
  const trainers = selfCard?.trainer.map?.(
    (value) => ' ' + userList.find((user) => user.id === value)?.name,
  );

  //generate a userlist without the none option
  const newUserList = userList?.filter((user) => user.id !== '1');

  const updateCard = (key, value) => {
    if (key === 'trainer') {
      const trainers = value?.map((value) => value.value);

      selfCard[key] = trainers;

      setSelfCard(selfCard);
    } else {
      const newCard = {
        ...selfCard,
        [key]: value,
      };

      setSelfCard(newCard);
    }
  };

  const updateCards = () => {
    if (edit) {
      const newArray = [...cardArray];
      const newCard = selfCard;
      delete newCard?.name;
      delete newCard?.color;

      newArray[index] = newCard;

      setCardsArray(newArray);
    }
    setEdit(!edit);
  };

  const deleteCard = () => {
    const newArray = cardArray.filter((card) => card !== selfCard);

    setCardsArray(newArray);
  };

  return (
    <>
      {!deleteCardState ? (
        <>
          <CCardHeader
            className={
              errorMsg?.cards && (!selfCard?.trainer || !selfCard?.body)
                ? 'card-warning'
                : ''
            }
          >
            {edit && (
              <SelectFieldComponent
                placeholder={t('user.fields.cards.placeholder')}
                name="selectCardType"
                value={selfCard?.id}
                onChange={(event) =>
                  setSelfCard(newObjCard(event, cardsTypes, selfCard))
                }
                options={cardsTypes}
                isSearchable={false}
              />
            )}
            {!edit && cardBasicInfo?.name}
          </CCardHeader>

          <CCardBody>
            {edit ? (
              selfCard?.body ? (
                <>
                  <div className="card-input">
                    <InputField
                      name="date"
                      type="date"
                      value={selfCard?.date}
                      onChange={(event) =>
                        updateCard('date', event.target.value)
                      }
                      className="card-input-format"
                    />

                    {selfCard.id ===
                      '6d2921e88a9f-d886fc90-b3dcf229-67033952-fcf54ae2ba55bacf' && (
                      <>
                        {!haveReservation && (
                          <Button
                            onClick={() => setHaveReservation(true)}
                            name={t('btn.create-edit.cards.reservation')}
                          />
                        )}
                        {haveReservation && (
                          <InputField
                            name="reservation"
                            type="date"
                            value={selfCard?.reservation}
                            onChange={(event) =>
                              updateCard('reservation', event.target.value)
                            }
                            className="card-input-format"
                          />
                        )}
                      </>
                    )}

                    {selfCard.id !==
                      '6d2921e88a9f-d886fc90-b3dcf229-67033952-fcf54ae2ba55bacf' && (
                      <SelectFieldComponent
                        placeholder={t('user.fields.cards.trainer')}
                        name="trainer"
                        value={selfCard?.trainer}
                        onChange={(event) => updateCard('trainer', event)}
                        options={newUserList}
                        className="card-input-format"
                        isMulti={true}
                      />
                    )}
                  </div>

                  {selfCard.id ===
                    '6d2921e88a9f-d886fc90-b3dcf229-67033952-fcf54ae2ba55bacf' && (
                    <SelectFieldComponent
                      placeholder={t('user.fields.cards.trainer')}
                      name="trainer"
                      value={selfCard?.trainer}
                      onChange={(event) => updateCard('trainer', event)}
                      options={newUserList}
                      className="card-input-format-second"
                      isMulti={true}
                    />
                  )}

                  <TextAreaField
                    placeholder={t('user.fields.cards.bodyplaceholder')}
                    value={selfCard?.body}
                    onChange={(event) => updateCard('body', event.target.value)}
                  />
                </>
              ) : (
                ''
              )
            ) : (
              <div>
                {trainers && <div>{`${selfCard?.date} ${trainers}`}</div>}
                {selfCard?.reservation && (
                  <div>{`${selfCard?.reservation} ${t(
                    'user.fields.cards.reservation',
                  )}`}</div>
                )}
                <div className="text-line">{selfCard?.body}</div>
              </div>
            )}
          </CCardBody>
          <div className="cards-button">
            {!edit && (
              <CButton
                shape="pill"
                variant={'ghost'}
                size="sm"
                color="danger"
                onClick={() => setDeleteCardState(true)}
              >
                <CIcon name={'cil-trash'} />
                {t('btn.create-edit.cards.delete')}
              </CButton>
            )}
            <CButton
              shape="pill"
              variant={edit ? '' : 'ghost'}
              size="sm"
              color="primary"
              onClick={() => updateCards()}
            >
              <CIcon name={edit ? 'cil-save' : 'cil-pencil'} />
              {edit
                ? ' ' + t('btn.create-edit.cards.save')
                : ' ' + t('btn.create-edit.cards.edit')}
            </CButton>
          </div>
          {!edit && (!selfCard?.trainer || !selfCard?.body) ? (
            <p className="text-center card-warning">{errorMsg?.cards}</p>
          ) : (
            ''
          )}
        </>
      ) : (
        <DeleteWarning
          deleteCard={deleteCard}
          setDeleteCardState={setDeleteCardState}
          t={t}
        />
      )}
    </>
  );
};

export default Card;
