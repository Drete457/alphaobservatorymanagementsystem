import { useState } from 'react';
import { CCardBody, CCardHeader, CButton } from '@coreui/react';
import { SelectFieldComponent, TextAreaField, InputField } from '../../input';
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

const Card = ({
  t,
  card,
  index,
  cardArray,
  setCardsArray,
  cardsTypes,
  errorMsg,
}) => {
  const [selfCard, setSelfCard] = useState(card);
  const [edit, setEdit] = useState(false);

  const updateCard = (event) => {
    let newCard = {
      ...selfCard,
      body: event.target.value,
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
      <CCardHeader>
        {edit ? (
          <SelectFieldComponent
            placeholder={t('user.fields.cards.placeholder')}
            value={selfCard?.id}
            errorMsg={errorMsg?.cards}
            onChange={(event) => setSelfCard(newObjCard(event, cardsTypes))}
            options={cardsTypes}
          />
        ) : (
          selfCard?.name
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
          <div className="text-line">{selfCard?.body}</div>
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
    </>
  );
};

export default Card;
