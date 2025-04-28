import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  //   .use(
  //     resourcesToBackend(
  //       (language: string, namespace: string) =>
  //         import(`./assets/locales/${language}.json`)
  //     )
  //   )
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
