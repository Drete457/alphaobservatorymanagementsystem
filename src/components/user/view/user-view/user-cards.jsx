import { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm, CCard } from '@coreui/react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { getStyle } from '@coreui/utils';
import GenerateLink from 'components/user/buttons/generate-link';
import userHandler from 'helpers/user';
import Card from './card';
import 'react-grid-layout/css/styles.css';

const UserCards = ({ user, userList }) => {
  const [t] = useTranslation();
  const breakPoints = {
    xl: parseInt(getStyle('--breakpoint-xl'), 10),
  };
  const ResponsiveGridLayout = WidthProvider(Responsive);

  const [rotation, setRotation] = useState(false);
  let cardsPositions = user.cardsPosition
    ? {
        xl: user.cardsPosition['xl']?.map((value) => {
          return { ...value, isDraggable: false, isResizable: false };
        }),
      }
    : userHandler.layouts;

  window.screen.orientation.onchange = () =>
    userHandler.screenOrientation(true, setRotation);

  useLayoutEffect(() => {
    userHandler.screenOrientation(true, setRotation);
  }, []);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.view.cards.title')}</h1>

        <GenerateLink id={user.id} />
      </header>
      {rotation}
      <main className="main-body">
        <CForm>
          {user?.cards && rotation ? (
            <div className="device-rotation" />
          ) : (
            <ResponsiveGridLayout
              className="layout"
              layouts={cardsPositions}
              breakpoints={breakPoints}
              cols={{ xl: 3 }}
              isResizable={false}
              measureBeforeMount={false}
              isDraggable={false}
            >
              {rotation ? (
                <div className="device-rotation" />
              ) : (
                user?.cards?.map((card, index) => {
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
                })
              )}
            </ResponsiveGridLayout>
          )}
        </CForm>
      </main>
    </>
  );
};

export default UserCards;
