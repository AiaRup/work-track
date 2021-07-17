import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import { AppProvider } from './contexts';
import { Router } from './Router';

require('dotenv').config();

const theme = createTheme({
  palette: {
    primary: { main: '#9c27b0' }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Router />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
