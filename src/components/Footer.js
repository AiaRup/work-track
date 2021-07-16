import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../assets/jss/material-dashboard-react/components/footerStyle.js';

const useStyles = makeStyles(styles);

export const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left} />
        <p className={classes.right}>
          <span>
            {'Copyright © '} {1900 + new Date().getYear()} Aia Rupsom.
          </span>
        </p>
      </div>
    </footer>
  );
};
