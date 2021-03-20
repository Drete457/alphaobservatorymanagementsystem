import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm, CCard } from '@coreui/react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { getStyle } from '@coreui/utils';
import 'react-grid-layout/css/styles.css';
import ButtonCards from '../../buttons/cards';
import userHandler from '../../../../helpers/user';
import Card from './card';

const updateCardsPosition = (layout, cardPositions) => {
  const newPosition = cardPositions['xl'].map((value, index) => {
    if (typeof layout[index] === 'object') {
      if (value.x === layout[index].x && value.y === layout[index].y) {
        return value;
      } else {
        const card = { ...value, x: layout[index].x, y: layout[index].y };

        return card;
      }
    }
    return value;
  });
  localStorage.setItem('cardsPosition', JSON.stringify({ xl: newPosition }));
};

const UserCards = ({ user, setUser, errorMsg, cardsTypes, userList }) => {
  const [t] = useTranslation();
  const breakPoints = {
    xl: parseInt(getStyle('--breakpoint-xl'), 10),
  };
  const ResponsiveGridLayout = WidthProvider(Responsive);

  const [cardArray, setCardsArray] = useState(user.cards ?? []);
  let cardsPositions = JSON.parse(
    user?.cardsPosition || JSON.stringify(userHandler.layouts),
  );

  useEffect(() => {
    user.cards = cardArray;
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
            onLayoutChange={(layout, layouts) => {
              updateCardsPosition(layouts['xl'], cardsPositions);
            }}
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
