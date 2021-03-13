import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm, CCard, CCardBody, CCardHeader } from '@coreui/react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { getStyle } from '@coreui/utils';
import 'react-grid-layout/css/styles.css';
import CIcon from '@coreui/icons-react';
import userHandler from '../../../../helpers/user';

const UserCards = ({ user }) => {
  const [t] = useTranslation();
  const breakPoints = {
    xl: parseInt(getStyle('--breakpoint-xl'), 10),
  };
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const [cardArray, setCardsArray] = useState([]);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.view.cards.title')}</h1>
      </header>

      <main className="main-body">
        <div className="cards-button">
          <CIcon
            name="cil-note-add"
            onClick={() =>
              setCardsArray([{ title: '', body: '' }, ...cardArray])
            }
          ></CIcon>
        </div>
        <CForm>
          <ResponsiveGridLayout
            className="layout"
            layouts={userHandler.layouts}
            breakpoints={breakPoints}
            cols={{ xl: 3 }}
            isResizable={false}
            measureBeforeMount={true}
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
