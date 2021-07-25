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

import { CustomButton } from './Button';
import styles from '../assets/jss/material-dashboard-react/components/codeModalStyle.js';

const useStyles = makeStyles(styles);

export const CodeModal = ({
  visible,
  onOk,
  onClose,
  phone = '1234567899',
  resendCode
}) => {
  const classes = useStyles();
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

  const handleClick = () => {
    input.current.focus();
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
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
          <div className={classes.wrap} onClick={handleClick}>
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
              value=''
              ref={input}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
          <button className={classes.anotherCode} onClick={resendCode}>
            Send another code
          </button>

          <CustomButton
            autoFocus
            disabled={code.length < 6}
            onClick={onOk}
            color='primary'
          >
            <FormattedMessage id='verify' />
          </CustomButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
