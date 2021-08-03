import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

import styles from '../assets/jss/material-dashboard-react/components/languageSelectStyle.js';
import ThaiFlag from '../assets/img/thai-flag.png';
import EnglishFlag from '../assets/img/english-flag.png';
import { AppContext } from '../contexts/AppContext.js';

const useStyles = makeStyles(styles);

export const LanguageSelect = () => {
  const classes = useStyles();
  const { dispatch, language } = useContext(AppContext);

  const onChange = (e) => {
    if (language !== e.target.value) {
      dispatch({ type: 'SET_LANGUAGE', payload: e.target.value });
    }
  };

  return (
    <Select
      autoWidth
      value={language}
      onChange={onChange}
      name='value'
      variant='filled'
      style={{ marginTop: 10 }}
      className={classes.selectOptions}
      classes={{
        select: classes.selectOptions,
        icon: classes.icon
      }}
    >
      <MenuItem value={'th'} className={classes.item}>
        <div className={classes.option}>
          <img src={ThaiFlag} height='10px' alt='thai flag' />
          <FormattedMessage id='thai' />
        </div>
      </MenuItem>
      <MenuItem value={'en'} className={classes.item}>
        <div className={classes.option}>
          <img src={EnglishFlag} height='10px' alt='usa flag' />
          <FormattedMessage id='english' />
        </div>
      </MenuItem>
    </Select>
  );
};
