import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm, CCard, CCardBody, CCardHeader } from '@coreui/react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { getStyle } from '@coreui/utils';
import 'react-grid-layout/css/styles.css';
import ButtonCards from '../../buttons/cards';
import userHandler from '../../../../helpers/user';

const UserCards = () => {
  const [t] = useTranslation();
  const breakPoints = {
    xl: parseInt(getStyle('--breakpoint-xl'), 10),
  };
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const [cardArray, setCardsArray] = useState([]);
  const [edit, setEdit] = useState(false);

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
                <CCardHeader>{card?.title}</CCardHeader>
                <CCardBody>{card?.body}</CCardBody>
              </CCard>
            ))}
          </ResponsiveGridLayout>
        </CForm>
      </main>
    </>
  );
};

export default UserCards;
