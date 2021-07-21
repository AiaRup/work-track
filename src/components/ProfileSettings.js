import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, MenuItem, TextField, Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import styles from '../assets/jss/material-dashboard-react/components/profileSettingsStyle.js';
import { AppContext } from '../contexts';

const useStyles = makeStyles(styles);

export const ProfileSettings = () => {
  const classes = useStyles();
  const { user } = useContext(AppContext);

  return (
    <form className={classes.root} noValidate>
      <Grid item xs={12}>
        <TextField
          autoComplete='fname'
          name='firstName'
          variant='outlined'
          required
          fullWidth
          id='firstName'
          label={<FormattedMessage id='first_name' />}
          autoFocus
          className={classes.input}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant='outlined'
          required
          fullWidth
          id='lastName'
          label={<FormattedMessage id='last_name' />}
          name='lastName'
          autoComplete='lname'
          className={classes.input}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant='outlined'
          required
          fullWidth
          id='email'
          label={<FormattedMessage id='email' />}
          name='email'
          autoComplete='email'
          className={classes.input}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant='outlined'
          required
          fullWidth
          name='password'
          label={<FormattedMessage id='password' />}
          type='password'
          id='password'
          autoComplete='current-password'
          className={classes.input}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id='salary-hour'
          select
          label={<FormattedMessage id='wage_for_hour' />}
          value={100}
          onChange={() => true}
          variant='outlined'
          className={classes.input}
        >
          <MenuItem value={60}>60</MenuItem>
          <MenuItem value={75}>75</MenuItem>
          <MenuItem value={80}>80</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </TextField>
      </Grid>
      <Button
        type='submit'
        variant='contained'
        className={classes.submit}
        disabled
      >
        <FormattedMessage id='save_changes' />
      </Button>
    </form>
  );
};
