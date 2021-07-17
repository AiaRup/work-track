import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import styles from '../../assets/jss/material-dashboard-react/components/cardAvatarStyle.js';

const useStyles = makeStyles(styles);

export const CardAvatar = ({
  children,
  className,
  plain,
  profile,
  ...rest
}) => {
  const classes = useStyles();

  const cardAvatarClasses = classNames({
    [classes.cardAvatar]: true,
    [classes.cardAvatarProfile]: profile,
    [classes.cardAvatarPlain]: plain,
    [className]: className !== undefined
  });
  return (
    <div className={cardAvatarClasses} {...rest}>
      {children}
    </div>
  );
};
