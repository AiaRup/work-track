import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export const FloatingButton = ({ onClick }) => {
  return (
    <Fab size='medium' color='secondary' aria-label='add' onClick={onClick}>
      <AddIcon />
    </Fab>
  );
};
