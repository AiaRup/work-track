import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';

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
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <AppProvider>
          <Router />
        </AppProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
