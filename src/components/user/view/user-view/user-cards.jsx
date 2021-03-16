import { useTranslation } from 'react-i18next';
import { CForm, CCard } from '@coreui/react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { getStyle } from '@coreui/utils';
import 'react-grid-layout/css/styles.css';
import userHandler from '../../../../helpers/user';
import Card from './card';

const UserCards = ({ user, userList }) => {
  const [t] = useTranslation();
  const breakPoints = {
    xl: parseInt(getStyle('--breakpoint-xl'), 10),
  };
  const ResponsiveGridLayout = WidthProvider(Responsive);

  return (
    <>
      <header>
        <h1 className="title">{t('pages.user.view.cards.title')}</h1>
      </header>

      <main className="main-body">
        <CForm>
          <ResponsiveGridLayout
            className="layout"
            layouts={userHandler.layouts}
            breakpoints={breakPoints}
            cols={{ xl: 3 }}
            isResizable={false}
            measureBeforeMount={false}
          >
            {user?.cards?.map((card, index) => {
              return (
                <CCard key={index + ''} accentColor="primary">
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
