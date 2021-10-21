import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import styles from '../assets/jss/material-dashboard-react/components/profileSettingsStyle.js';
import { AppContext } from '../contexts';
import * as FirestoreService from '../services/firebase';
import { useNotifier } from '../hooks';

const useStyles = makeStyles(styles);

export const ProfileSettings = () => {
  const classes = useStyles();
  const { user } = useContext(AppContext);
  const { dispatch } = useContext(AppContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [hourSalary, setHourSalary] = useState(user.hourSalary);
  const [phone, setPhone] = useState(user.phoneNumber);

  const updateUser = useNotifier({
    action: async (e) => {
      e.preventDefault();
      await FirestoreService.updateUserDetails(user.id, {
        firstName,
        lastName,
        hourSalary
      });
      dispatch({
        type: 'SET_USER',
        payload: {
          ...user,
          firstName,
          lastName,
          hourSalary
        }
      });
    },
    fail: 'error_update_user_details'
  });

  return (
    <form className={classes.root} onSubmit={updateUser}>
      <Grid item xs={12}>
        <TextField
          autoComplete='fname'
          name='firstName'
          variant='outlined'
          required
          fullWidth
          id='firstName'
          defaultValue={firstName}
          label={<FormattedMessage id='first_name' />}
          autoFocus
          className={classes.input}
          onInput={(e) => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant='outlined'
          required
          fullWidth
          id='lastName'
          defaultValue={lastName}
          label={<FormattedMessage id='last_name' />}
          name='lastName'
          autoComplete='lname'
          className={classes.input}
          onInput={(e) => setLastName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant='outlined'
          fullWidth
          id='phone'
          label={<FormattedMessage id='phone' />}
          name='phone'
          disabled
          defaultValue={phone}
          inputProps={{ readOnly: true }}
          className={classes.input}
          onInput={(e) => setPhone(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant='outlined'
          fullWidth
          id='salary-hour'
          type='number'
          defaultValue={hourSalary}
          label={<FormattedMessage id='wage_for_hour' />}
          name='salary-hour'
          autoComplete='slalaryHour'
          onInput={(e) => setHourSalary(Number(e.target.value))}
        />
      </Grid>
      <Button
        type='submit'
        variant='contained'
        className={classes.submit}
        disabled={!lastName || !firstName || !hourSalary}
      >
        <FormattedMessage id='save_changes' />
      </Button>
    </form>
  );
};
