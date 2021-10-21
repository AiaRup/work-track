import React, { useState, useEffect } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { FormattedMessage } from 'react-intl';

import { useNotification } from '../hooks';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export const Notification = () => {
  const [open, setOpen] = useState(false);
  const { error, success, removeNotification } = useNotification();

  useEffect(() => {
    setOpen(error || success ? true : false);
  }, [error, success]);

  function handleClose() {
    removeNotification();
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={error ? 'error' : 'success'} onClose={handleClose}>
        <FormattedMessage
          id={error ? error?.message : success ? success?.message : 'done'}
        />
      </Alert>
    </Snackbar>
  );
};
