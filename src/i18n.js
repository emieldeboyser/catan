import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import nl from "./locales/nl.json";

// Use the JSON files as the resources for translations
const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  nl: {
    translation: nl,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // default language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
