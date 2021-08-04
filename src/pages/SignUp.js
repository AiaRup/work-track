import React, { useContext, useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  MenuItem
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import signupStyle from '../assets/jss/material-dashboard-react/layouts/signupStyle';
import { addUser } from '../services/firebase';
import { AppContext } from '../contexts/AppContext.js';
import { LanguageSelect } from '../components';

const useStyles = makeStyles(signupStyle);

export default function SignUp() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { dispatch } = useContext(AppContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hourSalary, setHourSalary] = useState('');

  const onSignup = async (e) => {
    e.preventDefault();
    addUser({
      authId: location?.state?.auth || '111',
      phoneNumber: location?.state?.phoneNumber || '1112',
      firstName,
      lastName,
      hourSalary
    }).then((doc) => {
      if (doc) {
        console.log('doc', doc);
        dispatch({ type: 'LOGIN', payload: doc });
        history.push({
          pathname: '/dashboard'
        });
      }
    });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <LanguageSelect />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          <FormattedMessage id='signup' />
        </Typography>
        <p>
          <FormattedMessage id='sign_up_description' />
        </p>
        <form className={classes.form} onSubmit={onSignup}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label={<FormattedMessage id='first_name' />}
                autoFocus
                onInput={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label={<FormattedMessage id='last_name' />}
                name='lastName'
                autoComplete='lname'
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
                inputProps={{ readOnly: true }}
                defaultValue={location.state?.phoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='salary-hour'
                select
                label={<FormattedMessage id='wage_for_hour' />}
                variant='outlined'
                helperText={<FormattedMessage id='wage_description' />}
                onChange={(e) => setHourSalary(e.target.value)}
              >
                <MenuItem value={60}>60&#8362;</MenuItem>
                <MenuItem value={75}>75&#8362;</MenuItem>
                <MenuItem value={80}>80&#8362;</MenuItem>
                <MenuItem value={100}>100&#8362;</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={!firstName || !lastName || !hourSalary}
          >
            <FormattedMessage id='finish' />
          </Button>
        </form>
      </div>
    </Container>
  );
}
