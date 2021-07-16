import React from 'react';
import { AppProvider } from './contexts';
import { Router } from './Router';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

require('dotenv').config();

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500]
    },
    secondary: {
      main: '#f44336'
    }
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
