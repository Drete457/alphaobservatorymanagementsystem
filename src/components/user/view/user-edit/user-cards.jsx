import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm, CCard } from '@coreui/react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { getStyle } from '@coreui/utils';
import ButtonCards from '../../buttons/cards';
import userHandler from '../../../../helpers/user';
import Card from './card';
import 'react-grid-layout/css/styles.css';

const UserCards = ({ user, setUser, errorMsg, cardsTypes, userList }) => {
  const [t] = useTranslation();
  const breakPoints = {
    xl: parseInt(getStyle('--breakpoint-xl'), 10),
  };
  const ResponsiveGridLayout = WidthProvider(Responsive);

  const [cardArray, setCardsArray] = useState(user.cards ?? []);
  let cardsPositions =
    JSON.parse(localStorage.getItem('cardsPosition')) ||
    user.cardsPosition ||
    userHandler.layouts;

  useEffect(() => {
    user.cards = cardArray;

    //write the dates in the correct properties of the user
    const cardsIdToPutDate = userHandler.cardsIdToPutDate();
    const cardsWithId = cardArray.filter((card) => card.id);

    for (var value in cardsWithId) {
      const id = cardsWithId[value].id;

      if (id in cardsIdToPutDate) {
        const propertie = cardsIdToPutDate[id];
        user[propertie] = cardsWithId[value].date;
      }
    }

    setUser(user);
  }, [cardArray, user, setUser]);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.edit.cards.title')}</h1>
      </header>

      <main className="main-body">
        <ButtonCards setCardsArray={setCardsArray} cardArray={cardArray} />
        <CForm>
          <ResponsiveGridLayout
            className="layout"
            layouts={cardsPositions}
            onLayoutChange={(layout, layouts) =>
              userHandler.updateCardsPosition(layouts['xl'], cardsPositions)
            }
            breakpoints={breakPoints}
            cols={{ xl: 3 }}
            isResizable={false}
            measureBeforeMount={false}
            draggableHandle={'.card-header'}
          >
            {cardArray.map?.((card, index) => {
              return (
                <CCard key={index + ''} accentColor="primary">
                  <span
                    style={{
                      background: card?.color,
                    }}
                    className="card-header-banner-color"
                  ></span>
                  <Card
                    t={t}
                    card={card}
                    index={index}
                    cardArray={cardArray}
                    setCardsArray={setCardsArray}
                    cardsTypes={cardsTypes}
                    errorMsg={errorMsg}
                    userList={userList}
                  />
                </CCard>
              );
            })}
          </ResponsiveGridLayout>
        </CForm>
      </main>
    </>
  );
};

export default UserCards;
