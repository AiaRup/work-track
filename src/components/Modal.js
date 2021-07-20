import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Input,
  MenuItem,
  FormControl,
  Select,
  IconButton,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import styles from '../assets/jss/material-dashboard-react/components/modalStyle.js';
import { CustomButton } from './Button';

const useStyles = makeStyles(styles);

export const CustomModal = ({
  visible,
  onOk,
  onClose,
  massageEditable = {}
}) => {
  const [state, setState] = useState({
    minutes: '',
    type: ''
  });

  useEffect(() => {
    if (massageEditable.type && massageEditable.minutes) {
      setState({
        minutes: massageEditable.minutes,
        type: massageEditable.type
      });
    }
  }, [massageEditable]);

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  const { minutes, type } = state;

  const classes = useStyles();
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby='customized-dialog-title'
      open={visible}
      className={classes.modal}
    >
      <DialogTitle disableTypography className={classes.title}>
        <Typography variant='h6'>New Massage</Typography>
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
          <FormControl className={classes.formControl} required>
            <InputLabel htmlFor='type-select-label'>Type</InputLabel>
            <Select
              labelId='type-label-id'
              id='type-label'
              value={type}
              onChange={handleChange}
              input={<Input />}
              variant='outlined'
              name='type'
            >
              <MenuItem value={'Body'}>Body</MenuItem>
              <MenuItem value={'Foot'}>Foot</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} required>
            <InputLabel id='minutes-select-label'>Minutes</InputLabel>
            <Select
              labelId='minutes-label-id'
              id='minutes-label'
              value={minutes}
              onChange={handleChange}
              input={<Input />}
              variant='outlined'
              name='minutes'
            >
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={60}>60</MenuItem>
              <MenuItem value={75}>75</MenuItem>
              <MenuItem value={90}>90</MenuItem>
              <MenuItem value={120}>120</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <CustomButton
          autoFocus
          disabled={!type || !minutes}
          onClick={() => {
            onOk({ ...state, id: massageEditable.id });
            setState({});
          }}
          color='primary'
        >
          Save
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};
