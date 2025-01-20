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

// {
//     "gameName": "Knights",
//     "player1": "Thys",
//     "player2": "Romy",
//     "player3": "Emiel",
//     "winner": "player1",
//     "diceCounter": {
//         "two": 1,
//         "three": 5,
//         "four": 2,
//         "five": 8,
//         "six": 4,
//         "seven": 3,
//         "eight": 5,
//         "nine": 2,
//         "ten": 4,
//         "eleven": 3,
//         "twelve": 1
//     },
//     "date": 1735331231967,
//     "points": {
//         "player1": 13,
//         "player2": 7,
//         "player3": 7,
//         "player4": -3
//     },
//     "notes": "thys suckt"
// }

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
