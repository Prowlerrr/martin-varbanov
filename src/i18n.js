import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationBG from './locales/bg/translation.json';
import translationEN from './locales/en/translation.json';


i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .init({
        resources: {
            en: {
                translation: translationEN
            },
            bg: {
                translation: translationBG
            }
        },
        lng: "bg",
        fallbackLng: "bg", // use bg if detected lng is not available
        detection: {
            order: ['queryString', 'cookie', 'localStorage', 'htmlTag', 'navigator'],
            caches: ['cookie']
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;