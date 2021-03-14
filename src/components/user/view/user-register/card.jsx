import { useState } from 'react';
import { CCardBody, CCardHeader, CButton } from '@coreui/react';
import { SelectFieldComponent, TextAreaField } from '../../input';
import CIcon from '@coreui/icons-react';

const newObjCard = (event, cardsTypes) => {
  const card = cardsTypes.find((card) => {
    if (card.id === event.value) {
      return card;
    }
    return null;
  });

  return card;
};

const updateCards = (value, cardArray, setCardsArray, index) => {
  let newArray = [...cardArray];

  newArray[index] = {
    ...newArray[index],
    body: value,
  };

  setCardsArray(newArray);
};

const Card = ({
  t,
  card,
  index,
  cardArray,
  setCardsArray,
  cardsTypes,
  errorMsg,
}) => {
  const cardType = cardsTypes.find((value) => value.id === card.id);
  const [selfCard, setSelfCard] = useState(card);
  const [edit, setEdit] = useState(false);

  const updateCard = (event) => {
    let newCard = {
      ...selfCard,
      body: event.target.value,
    };
    setSelfCard(newCard);
  };

  return (
    <>
      <CCardHeader>
        <CButton
          shape="pill"
          variant={edit ? '' : 'ghost'}
          size="md"
          color="primary"
          onClick={() => setEdit(!edit)}
        >
          <CIcon name={edit ? 'cil-save' : 'cil-pencil'} />
          {edit
            ? ' ' + t('btn.create-edit.cards.save')
            : ' ' + t('btn.create-edit.cards.edit')}
        </CButton>

        {edit ? (
          <SelectFieldComponent
            placeholder={t('user.fields.cards.placeholder')}
            value={selfCard?.id}
            errorMsg={errorMsg?.cards}
            onChange={(event) => setSelfCard(newObjCard(event, cardsTypes))}
            options={cardsTypes}
          />
        ) : (
          cardType?.name
        )}
      </CCardHeader>
      <CCardBody>
        {edit ? (
          selfCard?.body ? (
            <TextAreaField
              placeholder={t('user.fields.cards.bodyplaceholder')}
              value={selfCard?.body}
              errorMsg={errorMsg?.cards}
              onChange={(event) => updateCard(event)}
            />
          ) : (
            ''
          )
        ) : (
          selfCard?.body
        )}
      </CCardBody>
    </>
  );
};

export default Card;
