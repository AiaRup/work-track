import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';

import { AppProvider } from './contexts';
import { Router } from './Router';
import { FirebaseProvider } from './services/firebase';

require('dotenv').config();

const theme = createTheme({
  palette: {
    primary: { main: '#9c27b0' }
  }
});

const App = () => {
  return (
    <FirebaseProvider>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <AppProvider>
            <Router />
          </AppProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </FirebaseProvider>
  );
};

export default App;
