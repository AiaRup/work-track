import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';

import { AppProvider, NotificationProvider } from './contexts';
import { Router } from './Router';
import { Notification } from './components';

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
          <NotificationProvider>
            <Router />
            <Notification key={new Date()} />
          </NotificationProvider>
        </AppProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
