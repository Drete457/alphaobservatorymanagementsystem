import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm, CCard, CCardBody, CCardHeader } from '@coreui/react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { getStyle } from '@coreui/utils';
import { SelectFieldComponent, TextAreaField } from '../../input';
import 'react-grid-layout/css/styles.css';
import ButtonCards from '../../buttons/cards';
import userHandler from '../../../../helpers/user';

const newObjCard = (event, cardArray, cardsTypes, index) => {
  let newArray = [...cardArray];
  const card = cardsTypes.find((card) => {
    if (card.title === event.value) {
      return card;
    }
    return null;
  });

  newArray[index] = card;
  return newArray;
};

const UserCards = ({ user, setUser, errorMsg, cardsTypes }) => {
  const [t] = useTranslation();
  const breakPoints = {
    xl: parseInt(getStyle('--breakpoint-xl'), 10),
  };
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const [cardArray, setCardsArray] = useState([]);
  const [edit, setEdit] = useState(false);
  const cardsTypesTitle = Array.from(cardsTypes).map(
    (cardType) => cardType.title,
  );

  return (
    <>
      <header>
        <h1 className="title">{t(t('pages.user.registration.cards.title'))}</h1>
      </header>

      <main className="main-body">
        <ButtonCards
          setCardsArray={setCardsArray}
          cardArray={cardArray}
          setEdit={setEdit}
          edit={edit}
        />
        <CForm>
          <ResponsiveGridLayout
            className="layout"
            layouts={userHandler.layouts}
            breakpoints={breakPoints}
            cols={{ xl: 3 }}
            isResizable={false}
            measureBeforeMount={false}
          >
            {Array.from(cardArray).map((card, index) => (
              <CCard key={index + ''} accentColor="primary">
                <CCardHeader>
                  {edit ? (
                    <SelectFieldComponent
                      placeholder={t('user.fields.followed.placeholder')}
                      value={card?.title}
                      errorMsg={errorMsg?.cards}
                      onChange={(event) =>
                        setCardsArray(
                          newObjCard(event, cardArray, cardsTypes, index),
                        )
                      }
                      options={cardsTypesTitle}
                    />
                  ) : (
                    card?.title
                  )}
                </CCardHeader>
                <CCardBody>
                  {edit ? (
                    <TextAreaField
                      placeholder={t('user.fields.followed.placeholder')}
                      value={card?.body}
                      errorMsg={errorMsg?.cards}
                      onChange={() => {}}
                    />
                  ) : (
                    card?.body
                  )}
                </CCardBody>
              </CCard>
            ))}
          </ResponsiveGridLayout>
        </CForm>
      </main>
    </>
  );
};

export default UserCards;
