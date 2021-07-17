import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../assets/jss/material-dashboard-react/components/floatingButtonStyle';

const useStyles = makeStyles(styles);

export const FloatingButton = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Fab
      size='medium'
      aria-label='add'
      className={classes.floatingButton}
      onClick={onClick}
    >
      <AddIcon style={{ color: '#FFF' }} />
    </Fab>
  );
};
