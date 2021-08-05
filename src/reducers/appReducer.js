import { getTranslation } from '../i18n';

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USER':
      return {
        ...state,
        user: payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: payload,
        translations: getTranslation(payload)
      };
    default:
      return state;
  }
};
