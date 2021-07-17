import React from 'react';
import { AppProvider } from './contexts';
import { Router } from './Router';

require('dotenv').config();

const App = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default App;
