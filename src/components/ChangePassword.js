import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import styles from '../assets/jss/material-dashboard-react/components/profileSettingsStyle.js';

const useStyles = makeStyles(styles);

export const ChangePassword = () => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate>
      <Grid item xs={12}>
        <TextField
          name='password'
          variant='outlined'
          required
          fullWidth
          id='settings-password'
          label={<FormattedMessage id='password' />}
          autoFocus
          className={classes.input}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant='outlined'
          required
          fullWidth
          id='settings-confirm-password'
          label={<FormattedMessage id='confirm_password' />}
          name='confirmPassword'
          className={classes.input}
        />
      </Grid>
      <Button
        type='submit'
        variant='contained'
        className={classes.savePassword}
        disabled
      >
        <FormattedMessage id='save_new_password' />
      </Button>
    </form>
  );
};
