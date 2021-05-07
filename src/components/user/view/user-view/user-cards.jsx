import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CForm, CCard } from '@coreui/react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { getStyle } from '@coreui/utils';
import Button from 'components/button';
import userHandler from 'helpers/user';
import Card from './card';
import 'react-grid-layout/css/styles.css';

const generateLink = (set, id) => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  const url = `${protocol}//${host}/#/cards/${id}`;

  set(url);
};

const UserCards = ({ user, userList }) => {
  const [t] = useTranslation();
  const breakPoints = {
    xl: parseInt(getStyle('--breakpoint-xl'), 10),
  };
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const [hasGenerateLink, setHasGenerateLink] = useState(null);

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

        {
          //TODO Delete all this after the registration is full be using.
          hasGenerateLink ? (
            <div className="card-input-generate">
              <Button
                name="Copy Link"
                onClick={() => navigator.clipboard.writeText(hasGenerateLink)}
              />
              <input
                disabled
                value={hasGenerateLink}
                className="card-input-generate-link"
              />
            </div>
          ) : (
            <div className="card-generate-button">
              <Button
                name="Generate Link"
                isDanger={false}
                onClick={() => generateLink(setHasGenerateLink, user.id)}
              />
            </div>
          )
        }
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
