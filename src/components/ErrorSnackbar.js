import React, { useState } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { FormattedMessage } from 'react-intl';

import styles from '../assets/jss/material-dashboard-react/components/buttonStyle.js';

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
export const ErrorSnackbar = ({ message = 'Error' }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  return (
    <Snackbar open={true} autoHideDuration={6000}>
      <Alert severity='error'>
        <FormattedMessage id={message} />
      </Alert>
    </Snackbar>
  );
};
