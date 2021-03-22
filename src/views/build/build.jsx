import { useTranslation } from 'react-i18next';
import { construtionImg } from 'assets/images';

const Build = () => {
  const [t] = useTranslation();

  return (
    <>
      <header>
        <h1 className="title">{t('pages.constrution')}</h1>
      </header>
      <main>
        <img src={construtionImg} alt={t('pages.constrution')} className="center" />
      </main>
    </>
  );
};

export default Build;
