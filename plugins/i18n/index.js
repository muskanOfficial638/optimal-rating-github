import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import resources from './locales';

const fallbackLng = 'en';

let country = typeof window !== 'undefined' ?  localStorage.getItem('country') : null;

let lng = country ? country === 'null' ? 'en' : country : country;

i18n.use(initReactI18next).init({ lng, fallbackLng, resources });