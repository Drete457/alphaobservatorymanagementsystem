import { useTranslation } from 'react-i18next';
import { CForm, CCard } from '@coreui/react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { getStyle } from '@coreui/utils';
import userHandler from '../../../../helpers/user';
import Card from './card';
import 'react-grid-layout/css/styles.css';

const UserCards = ({ user, userList }) => {
  const [t] = useTranslation();
  const breakPoints = {
    xl: parseInt(getStyle('--breakpoint-xl'), 10),
  };
  const ResponsiveGridLayout = WidthProvider(Responsive);

  let cardsPositions = user.cardsPosition
    ? {
        xl: user.cardsPosition['xl']?.map((value) => {
          return { ...value, isDraggable: false, isResizable: false };
        }),
      }
    : userHandler.layouts;

  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.view.cards.title')}</h1>
      </header>

      <main className="main-body">
        <CForm>
          <ResponsiveGridLayout
            className="layout"
            layouts={cardsPositions}
            breakpoints={breakPoints}
            cols={{ xl: 3 }}
            isResizable={false}
            measureBeforeMount={false}
          >
            {user?.cards?.map?.((card, index) => {
              return (
                <CCard key={index + ''} accentColor="primary">
                  <span
                    style={{
                      background: card?.color,
                    }}
                    className="card-header-banner-color"
                  ></span>
                  <Card card={card} userList={userList} />
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
