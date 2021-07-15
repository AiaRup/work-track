import React, { createContext, useReducer } from 'react';

import { reducer } from '../reducers';

export const AppContext = createContext();

export const initialState = {
  user: null,
  language: true
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
