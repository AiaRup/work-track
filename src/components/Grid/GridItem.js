import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
  grid: {
    padding: '0 15px !important'
  }
};

const useStyles = makeStyles(styles);

export const GridItem = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
};
