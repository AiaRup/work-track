import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

import loginStyle from '../assets/jss/material-dashboard-react/layouts/loginStyle';
import { CodeModal, LanguageSelect } from '../components';
import { onPhoneNumberSubmit } from '../services/firebase';

const useStyles = makeStyles(loginStyle);

export default function SignIn() {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const onSubmitPhoneNumber = (e) => {
    e.preventDefault();
    onPhoneNumberSubmit(e, phoneNumber);
    setShowModal(true);
  };

  return (
    <Container component='main' maxWidth='xs'>
      {/* <LanguageSelect /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          <FormattedMessage id='signin' />
        </Typography>
        {/* for recaptcha purpose */}
        <div id='sign-in-button' />
        <form className={classes.form} onSubmit={onSubmitPhoneNumber}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='phone'
            label={<FormattedMessage id='phone' />}
            name='phone'
            autoComplete='phone'
            autoFocus
            helperText={<FormattedMessage id='enter_ten_digits' />}
            onInput={(e) => setPhoneNumber(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={phoneNumber.length !== 10}
          >
            <FormattedMessage id='signin' />
          </Button>
        </form>
      </div>
      <CodeModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        phone={phoneNumber}
        setVisible={setShowModal}
      />
    </Container>
  );
}
