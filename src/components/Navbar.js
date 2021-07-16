import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/icons/Menu';

import { CustomButton as Button } from './Button';
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
          <Button color='transparent' href='#' className={classes.title}>
            {routeName}
          </Button>
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
