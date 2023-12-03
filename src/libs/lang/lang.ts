import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'
import ar from "./ar.json";
import en from "./en.json";

const storedLang = localStorage.getItem("lang");

i18n.use(initReactI18next).use(LanguageDetector).init({
  lng: storedLang ?? "en",
  fallbackLng: "en",
  debug: false,
  // Options for language detector
  detection: {
    order: ['path', 'cookie', 'htmlTag'],
    caches: ['cookie'],
  },
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
