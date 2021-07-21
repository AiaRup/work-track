import React, { createContext, useReducer } from 'react';
import { IntlProvider } from 'react-intl';

import { getTranslation } from '../i18n';
import { reducer } from '../reducers';

export const AppContext = createContext();

export const initialState = {
  user: {
    id: '9ABE433E-F36B-1410-8D5F-00823E048C64',
    name: 'Aia Rupsom'
  },
  language: 'th',
  translations: getTranslation('th')
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
