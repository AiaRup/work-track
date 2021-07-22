import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Lottie from 'react-lottie';

import loading from '../assets/animations/loading.json';
import styles from '../assets/jss/material-dashboard-react/layouts/loadingStyle.js';

const useStyles = makeStyles(styles);

export default function Loading() {
  const classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className={classes.container}>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
}
