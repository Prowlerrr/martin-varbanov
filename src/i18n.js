import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// It might be that you need the translations loaded from .json files
// For this case use i18next-http-backend
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .init({
        lng: "bg",
        fallbackLng: "bg", // use bg if detected lng is not available
        detection: {
            order: ['queryString', 'cookie', 'localStorage', 'htmlTag', 'navigator'],
            caches: ['cookie']
        },
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    });

export default i18n;