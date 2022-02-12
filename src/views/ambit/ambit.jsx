import { useTranslation } from 'react-i18next';

const Ambit = () => {
  const [t] = useTranslation();

  return (
    <>
      <header>
        <h1 className="title">{t('pages.ambit.title')}</h1>
      </header>
      <main>
        <h3 className="m-5">{t('pages.ambit.no-autorized')}</h3>
      </main>
    </>
  );
};

export default Ambit;
