import { useTranslation } from 'react-i18next';

const Ambit = () => {
  const [t] = useTranslation();

  return (
    <>
      <header>
        <h1 className="title">{t('pages.constrution')}</h1>
      </header>
      <main></main>
    </>
  );
};

export default Ambit;
