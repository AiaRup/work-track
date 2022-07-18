import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  IconButton,
  Typography,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { FormattedMessage } from 'react-intl';

import styles from '../assets/jss/material-dashboard-react/components/modalStyle.js';
import { CustomButton } from './Button';

const useStyles = makeStyles(styles);

export const CustomModal = ({ visible, onOk, onClose, tips = {} }) => {
  const [state, setState] = useState(tips.amount || '0');

  useEffect(() => {
    if (tips.amount) {
      setState(tips.amount);
    } else {
      setState('0');
    }
  }, [tips.amount]);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const classes = useStyles();
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby='customized-dialog-title'
      open={visible}
      className={classes.modal}
    >
      <DialogTitle disableTypography className={classes.title}>
        <Typography variant='h6'>
          <FormattedMessage id='tip' />
        </Typography>
        {onClose ? (
          <IconButton
            aria-label='close'
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>
        <form>
          <FormControl className={classes.formControl}>
            <TextField
              required
              fullWidth
              type='number'
              id='tip-label'
              label={<FormattedMessage id='tip' />}
              defaultValue={state}
              onInput={handleChange}
              variant='outlined'
              name='tip'
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <CustomButton
          autoFocus
          disabled={!state}
          onClick={() => {
            onOk({ id: tips.id, amount: state });
            setState('0');
          }}
          color='primary'
        >
          <FormattedMessage id='save' />
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};
