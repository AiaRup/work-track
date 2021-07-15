import React, { createContext, useReducer } from 'react';
import { IntlProvider } from 'react-intl';

import { getTranslation } from '../i18n';
import { reducer } from '../reducers';

export const AppContext = createContext();

export const initialState = {
  user: null,
  language: 'en',
  translations: getTranslation('en')
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { language, translations } = state;

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <IntlProvider
        defaultLocale={language}
        locale={language}
        messages={translations}
      >
        {children}
      </IntlProvider>
    </AppContext.Provider>
  );
};
