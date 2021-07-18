import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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
            <InputLabel htmlFor='demo-dialog-native'>Type</InputLabel>
            <Select
              labelId='demo-dialog-select-label'
              id='demo-dialog-select'
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
            <InputLabel id='demo-dialog-select-label'>Minutes</InputLabel>
            <Select
              labelId='demo-dialog-select-label'
              id='demo-dialog-select'
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
