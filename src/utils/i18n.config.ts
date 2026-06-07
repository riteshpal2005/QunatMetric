import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import our translation dictionaries
import enCommon from '../i18n/en/common.json';
import esCommon from '../i18n/es/common.json';
import zhCommon from '../i18n/zh/common.json';
import jaCommon from '../i18n/ja/common.json';
import ruCommon from '../i18n/ru/common.json';
import deCommon from '../i18n/de/common.json';
import hiCommon from '../i18n/hi/common.json';

// Group the dictionaries into resources
const resources = {
  en: { common: enCommon },
  es: { common: esCommon },
  zh: { common: zhCommon },
  ja: { common: jaCommon },
  ru: { common: ruCommon },
  de: { common: deCommon },
  hi: { common: hiCommon },
};

i18n
  // Pass the i18n instance to react-i18next so our React components can use it
  .use(initReactI18next)
  .init({
    resources,
    // The default language used when the app starts
    lng: 'en', 
    
    // The language to use if a translation is missing in the current language
    fallbackLng: 'en',
    
    // We only have a "common" namespace for now, but we could add "auth", "settings", etc.
    ns: ['common'],
    defaultNS: 'common',

    interpolation: {
      // React already protects against XSS (Cross-Site Scripting), so we disable escaping here
      escapeValue: false,
    },
    
    // Optional: Log warnings when a translation key is missing during development
    debug: __DEV__,
  });

export default i18n;
