import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLang from "./lang/en.json";
import frLang from "./lang/fr.json";
import arLang from "./lang/ar.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: enLang,
  },
  fr: {
    translation: frLang,
  },
  ar: {
    translation: arLang,
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;