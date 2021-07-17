import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import styles from '../../assets/jss/material-dashboard-react/components/cardIconStyle.js';

const useStyles = makeStyles(styles);

export const CardIcon = ({ className, children, color, ...rest }) => {
  const classes = useStyles();
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[color + 'CardHeader']]: color,
    [className]: className !== undefined
  });
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
};
