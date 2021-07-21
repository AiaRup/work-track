import React, { useContext } from 'react';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  Button,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Icon,
  Checkbox
} from '@material-ui/core';
import Close from '@material-ui/icons/CloseRounded';
import Check from '@material-ui/icons/CheckRounded';
import { FormattedMessage } from 'react-intl';

import styles from '../assets/jss/material-dashboard-react/components/sidebarStyle.js';
import ThaiFlag from '../assets/img/thai-flag.png';
import EnglishFlag from '../assets/img/english-flag.png';
import { AppContext } from '../contexts/AppContext.js';

const useStyles = makeStyles(styles);

export const Sidebar = ({
  color,
  logoText,
  routes,
  rtlActive,
  open,
  handleDrawerToggle
}) => {
  const classes = useStyles();
  const { dispatch, language } = useContext(AppContext);
  let location = useLocation();

  function activeRoute(routeName) {
    if (routeName === '/dashboard') {
      return location.pathname === routeName || location.pathname === '/';
    }
    return location.pathname === routeName;
  }

  const setLanguage = (lan) => {
    dispatch({ type: 'SET_LANGUAGE', payload: lan });
  };

  var links = (
    <>
      <List className={classes.list}>
        {routes.map((prop, key) => {
          var activePro = ' ';

          const listItemClasses = classNames({
            [' ' + classes[color]]: activeRoute(prop.layout + prop.path)
          });

          const whiteFontClasses = classNames({
            [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path)
          });

          return (
            <NavLink
              to={prop.layout + prop.path}
              className={activePro + classes.item}
              activeClassName='active'
              key={key}
              onClick={open ? () => handleDrawerToggle() : null}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === 'string' ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: rtlActive
                    })}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: rtlActive
                    })}
                  />
                )}
                <ListItemText
                  primary={rtlActive ? prop.rtlName : prop.name}
                  className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: rtlActive
                  })}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          );
        })}
      </List>
      <div className={classes.languageContainer}>
        <Button
          variant='outlined'
          className={classes.languageButton}
          onClick={() => setLanguage('th')}
        >
          <Checkbox
            icon={<Check />}
            checkedIcon={<Check style={{ color: '#fff' }} />}
            checked={language === 'th'}
          />
          <img src={ThaiFlag} alt='thai flag' className={classes.flag} />
          <FormattedMessage id='thai' />
        </Button>
        <Button
          variant='outlined'
          className={classes.languageButton}
          onClick={() => setLanguage('en')}
        >
          <Checkbox
            icon={<Check />}
            checkedIcon={<Check style={{ color: '#fff' }} />}
            checked={language === 'en'}
          />
          <img src={EnglishFlag} alt='english flag' className={classes.flag} />
          <FormattedMessage id='english' />
        </Button>
      </div>
    </>
  );
  var brand = (
    <div className={classes.logo}>
      <span
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: rtlActive
        })}
      >
        {logoText}
        <Hidden mdUp implementation='css'>
          <Close onClick={handleDrawerToggle} className={classes.closeIcon} />
        </Hidden>
      </span>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation='css'>
        <Drawer
          variant='temporary'
          anchor={rtlActive ? 'left' : 'right'}
          open={open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: rtlActive
            })
          }}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='css'>
        <Drawer
          anchor={rtlActive ? 'right' : 'left'}
          variant='permanent'
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
        </Drawer>
      </Hidden>
    </div>
  );
};
