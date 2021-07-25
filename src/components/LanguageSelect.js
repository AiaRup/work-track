import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem } from '@material-ui/core';

import styles from '../assets/jss/material-dashboard-react/components/languageSelectStyle.js';
import ThaiFlag from '../assets/img/thai-flag.png';
import EnglishFlag from '../assets/img/english-flag.png';

const useStyles = makeStyles(styles);

export const LanguageSelect = () => {
  const classes = useStyles();
  const [language, setLanguage] = useState('th');

  const onChange = (e) => {
    console.log('value', e);
    setLanguage(e.target.value);
  };

  return (
    <Select
      autoWidth
      value={language}
      onChange={onChange}
      name='value'
      variant='filled'
      classes={{
        root: classes.root,
        select: classes.container
      }}
    >
      <MenuItem value={'th'} className={classes.item}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={ThaiFlag} height='10px' />
          <div>Inbox</div>
        </div>
      </MenuItem>
      <MenuItem value={'en'} className={classes.item}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={EnglishFlag} height='10px' />
          <div>Inbox</div>
        </div>
      </MenuItem>
    </Select>
  );
};
