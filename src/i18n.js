import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import bn from "./locales/bn/translation.json";
import en from "./locales/en/translation.json";

// 👇 read saved language
const savedLang = localStorage.getItem("lang") || "en"; // default to English if no language is saved

i18n
  .use(LanguageDetector) // to detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.init
  .init({
    resources: {
      en: { translation: en }, // 👈 add English translations
      bn: { translation: bn }, // 👈 add Bengali translations
    },
    lng: savedLang, // 👈 set initial language
    fallbackLng: "en", // 👈 fallback language if translation is missing
    interpolation: { // React already does escaping
      escapeValue: false,
    },
  });

export default i18n;
