import React, { useState, useEffect } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { FormattedMessage } from 'react-intl';

import { useNotification } from '../hooks';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export const ErrorSnackbar = () => {
  const [open, setOpen] = useState(false);
  const { error, removeError } = useNotification();

  useEffect(() => {
    setOpen(error ? true : false);
  }, [error]);

  function handleClose() {
    removeError();
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity='error' onClose={handleClose}>
        <FormattedMessage id={error ? error?.message : 'Error'} />
      </Alert>
    </Snackbar>
  );
};
