import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import { useLocation, useHistory } from 'react-router-dom';

import signupStyle from '../assets/jss/material-dashboard-react/layouts/signupStyle';
import { addUser } from '../services/firebase';
import { AppContext } from '../contexts/AppContext.js';

const useStyles = makeStyles(signupStyle);

export default function SignUp() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { dispatch } = useContext(AppContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hourSalary, setHourSalary] = useState('');

  const onSignup = async () => {
    const user = await addUser({
      authId: location.state.auth,
      phoneNumber: location.state.phoneNumber,
      firstName,
      lastName,
      hourSalary
    });

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      history.push({
        pathname: '/dashboard'
      });
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <p>
          Thank you for trying this app! It's your first login, so please fill
          in some details:
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
                label='First Name'
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
                label='Last Name'
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
                label='Phone'
                name='phone'
                inputProps={{ readOnly: true }}
                defaultValue={location.state.phoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='salary-hour'
                select
                label='Paid by hour'
                variant='outlined'
                helperText='The salary for one hour of massage, in shekels'
                onChange={(e) => setHourSalary(e.target.value)}
              >
                <MenuItem value={60}>60</MenuItem>
                <MenuItem value={75}>75</MenuItem>
                <MenuItem value={80}>80</MenuItem>
                <MenuItem value={100}>100</MenuItem>
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
            Finish sign up
          </Button>
        </form>
      </div>
    </Container>
  );
}
