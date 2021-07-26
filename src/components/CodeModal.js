import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { CustomButton } from './Button';
import styles from '../assets/jss/material-dashboard-react/components/codeModalStyle.js';
import { getUserByAuthId, onCodeSubmit } from '../services/firebase';

const useStyles = makeStyles(styles);

export const CodeModal = ({ visible, onClose, phone }) => {
  const classes = useStyles();
  const history = useHistory();
  const [code, setCode] = useState('');
  const [focused, setFocused] = useState(false);
  const input = useRef();
  const CODE_LENGTH = new Array(6).fill(0);
  const codedNumber = `******${phone.slice(-4)}`;

  const values = code.split('');
  const selectedIndex =
    values.length < CODE_LENGTH.length ? values.length : CODE_LENGTH.length - 1;
  const hideInput = !(values.length < CODE_LENGTH.length);

  const handleChange = (e) => {
    const value = e.target.value;

    if (code.length >= CODE_LENGTH.length) return null;
    setCode((code + value).slice(0, CODE_LENGTH.length));
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Backspace') {
      setCode(code.slice(0, code.length - 1));
    }
  };

  const finishCodeSubmit = async (e) => {
    const user = await onCodeSubmit(e, code);
    if (user) {
      const registeredUser = await getUserByAuthId(user.uid);
      if (registeredUser) {
        history.push({
          pathname: '/'
        });
      } else {
        history.push({
          pathname: '/signup',
          state: { authId: user.uid, phoneNumber: user.phoneNumber }
        });
      }
    }
  };

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby='customized-dialog-title'
      open={visible}
      className={classes.modal}
    >
      <DialogTitle disableTypography className={classes.titleWrapper}>
        <p className={classes.title}>
          {/* <FormattedMessage id='new_massage' /> */}
          {`Let's make sure it's really you. Enter the verification code we
            sent to the phone number ending in ${codedNumber}:`}
        </p>

        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider variant='middle' />
      <DialogContent>
        <div className={classes.codeWrapper}>
          <div className={classes.wrap} onClick={() => input.current.focus()}>
            {CODE_LENGTH.map((v, index) => {
              const selected = values.length === index;
              const filled =
                values.length === CODE_LENGTH.length &&
                index === CODE_LENGTH.length - 1;
              return (
                <div key={`code-${index}`} className={classes.display}>
                  {values[index]}
                  {(selected || filled) && focused && (
                    <div className={classes.shadows} />
                  )}
                </div>
              );
            })}
            <input
              type='number'
              value=''
              ref={input}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyUp={handleKeyUp}
              onChange={handleChange}
              className={classes.input}
              style={{
                width: '40px',
                top: '0px',
                bottom: '0px',
                left: `${selectedIndex * 40}px`,
                opacity: hideInput ? 0 : 1
              }}
            />
          </div>
        </div>

        <DialogActions className={classes.actions}>
          <button
            className={classes.anotherCode}
            onClick={(e) => onCodeSubmit(e, code)}
          >
            Send another code
          </button>

          <CustomButton
            autoFocus
            disabled={code.length < 6}
            onClick={(e) => finishCodeSubmit(e)}
            color='primary'
          >
            <FormattedMessage id='verify' />
          </CustomButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
