import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormattedMessage } from 'react-intl';

import loginStyle from '../assets/jss/material-dashboard-react/layouts/loginStyle';
import { CodeModal } from '../components';

const useStyles = makeStyles(loginStyle);

export default function SignIn() {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const onSubmitPhoneNumber = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          <FormattedMessage id='signin' />
        </Typography>
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
          >
            <FormattedMessage id='signin' />
          </Button>
        </form>
      </div>
      <CodeModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onOk={() => {}}
        phone={phoneNumber}
        resendCode={() => {}}
      />
    </Container>
  );
}
