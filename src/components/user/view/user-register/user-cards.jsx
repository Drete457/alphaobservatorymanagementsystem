import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm, CCard } from '@coreui/react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { getStyle } from '@coreui/utils';
import 'react-grid-layout/css/styles.css';
import ButtonCards from '../../buttons/cards';
import userHandler from '../../../../helpers/user';
import Card from './card';

const UserCards = ({ user, setUser, errorMsg, cardsTypes, userList }) => {
  const [t] = useTranslation();
  const breakPoints = {
    xl: parseInt(getStyle('--breakpoint-xl'), 10),
  };
  const ResponsiveGridLayout = WidthProvider(Responsive);

  const [cardArray, setCardsArray] = useState(user.cards ?? []);

  useEffect(() => {
    user.cards = cardArray;
    setUser(user);
  }, [cardArray, user, setUser]);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.registration.cards.title')}</h1>
      </header>

      <main className="main-body">
        <ButtonCards setCardsArray={setCardsArray} cardArray={cardArray} />
        <CForm>
          <ResponsiveGridLayout
            className="layout"
            layouts={userHandler.layouts}
            breakpoints={breakPoints}
            cols={{ xl: 3 }}
            isResizable={false}
            measureBeforeMount={false}
          >
            {cardArray.map((card, index) => {
              return (
                <CCard key={index + ''} accentColor="primary">
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
