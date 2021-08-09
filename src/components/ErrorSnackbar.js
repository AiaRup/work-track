import React, { useState, useEffect } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { FormattedMessage } from 'react-intl';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
export const ErrorSnackbar = ({ message = 'error' }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, [message]);

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity='error' onClose={handleClose}>
        <FormattedMessage id={message} />
      </Alert>
    </Snackbar>
  );
};
