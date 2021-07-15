import enTranslations from './languages/en';
import thTranslations from './languages/th';

const messages = {
  th: thTranslations,
  en: enTranslations
};

export const getTranslation = (currentIntl) =>
  messages[currentIntl] || enTranslations;
