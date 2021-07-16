import React from 'react';
import Typography from '@material-ui/core/Typography';

export const CopyRight = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      Aia Rupsom
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
