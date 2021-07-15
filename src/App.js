import React from 'react';

import { AppProvider } from './contexts';
import { Home } from './pages';

require('dotenv').config();

const App = () => {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
};

export default App;
