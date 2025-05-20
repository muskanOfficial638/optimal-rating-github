const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',           // Your default language
    locales: ['en', 'fr'],         // Supported languages (add all the locales you support)
  },
  localePath: path.resolve('./public/locales'), // Path to your locale files
};
