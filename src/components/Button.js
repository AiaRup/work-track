import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import styles from '../assets/jss/material-dashboard-react/components/buttonStyle.js';

const useStyles = makeStyles(styles);

export const CustomButton = ({
  color,
  round,
  children,
  disabled,
  simple,
  size,
  block,
  link,
  justIcon,
  className,
  muiClasses,
  ...rest
}) => {
  const classes = useStyles();

  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className
  });
  return (
    <Button {...rest} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  );
};
