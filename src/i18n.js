import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from 'assets/locales/en.json';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: true,
  },
});

export default i18n;
