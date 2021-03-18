import { useState } from 'react';
import { CCardBody, CCardHeader, CButton } from '@coreui/react';
import { SelectFieldComponent, TextAreaField, InputField } from '../../input';
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
    body: card.body,
    id: card.id,
    name: card.name,
  };

  return newCard;
};

const Card = ({
  t,
  card,
  index,
  cardArray,
  setCardsArray,
  cardsTypes,
  errorMsg,
  userList,
}) => {
  const [selfCard, setSelfCard] = useState(card);
  const [edit, setEdit] = useState(false);
  const trainer = userList.find((user) => user.id === card.trainer)?.name;

  //generate a userlist without the none option
  const newUserList = userList?.filter((user) => user.id !== '1');

  const updateCard = (key, value) => {
    let newCard = {
      ...selfCard,
      [key]: value,
    };

    setSelfCard(newCard);
  };

  const updateCards = () => {
    if (edit) {
      let newArray = [...cardArray];

      newArray[index] = selfCard;

      setCardsArray(newArray);
    }
    setEdit(!edit);
  };

  return (
    <>
      <CCardHeader
        className={
          errorMsg?.cards && (!selfCard?.trainer || !selfCard?.body)
            ? 'card-warning'
            : ''
        }
      >
        {edit ? (
          <SelectFieldComponent
            placeholder={t('user.fields.cards.placeholder')}
            value={selfCard?.id}
            onChange={(event) =>
              setSelfCard(newObjCard(event, cardsTypes, selfCard))
            }
            options={cardsTypes}
          />
        ) : (
          selfCard?.name
        )}
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
                  errorMsg={errorMsg?.community}
                  onChange={(event) => updateCard('date', event.target.value)}
                  className="card-input-format"
                />

                <SelectFieldComponent
                  placeholder={t('user.fields.cards.trainer')}
                  name="trainer"
                  value={selfCard?.trainer}
                  onChange={(event) => updateCard('trainer', event.value)}
                  options={newUserList}
                  className="card-input-format"
                />
              </div>
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
          <>
            {trainer && <div>{selfCard?.date + ' ' + trainer}</div>}
            <div className="text-line">{selfCard?.body}</div>
          </>
        )}
      </CCardBody>
      <div className="cards-button">
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
  );
};

export default Card;
