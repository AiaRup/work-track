import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Hidden } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';

import { useRouteName } from '../hooks';
import styles from '../assets/jss/material-dashboard-react/components/headerStyle';

const useStyles = makeStyles(styles);

export const Navbar = ({ color, handleDrawerToggle }) => {
  const classes = useStyles();
  const routeName = useRouteName();
  const appBarClasses = classNames({
    [' ' + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <span className={classes.title}>{routeName}</span>
        </div>
        <Hidden mdUp implementation='css'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
