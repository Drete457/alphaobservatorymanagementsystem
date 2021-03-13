import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm, CCard, CCardBody, CCardHeader } from '@coreui/react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { getStyle } from '@coreui/utils';
import 'react-grid-layout/css/styles.css';
import userHandler from '../../../../helpers/user';
import CIcon from '@coreui/icons-react';

const UserCards = () => {
  const [t] = useTranslation();
  const breakPoints = {
    xl: parseInt(getStyle('--breakpoint-xl'), 10),
  };
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const [cardArray, setCardsArray] = useState([]);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.edit.cards.title')}</h1>
      </header>

      <main className="main-body">
        <CIcon
          name="cil-note-add"
          onClick={() => setCardsArray([{ title: '', body: '' }, ...cardArray])}
        ></CIcon>
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
