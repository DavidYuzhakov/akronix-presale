import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector/cjs";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json"
import translationRU from "./locales/ru/translation.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      eng: {
        translation: translationEN
      },
      rus: {
        translation: translationRU
      }
    },
    fallbackLng: 'eng',
    detection: {
      order: ['queryString', 'localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;