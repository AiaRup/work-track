import React from 'react';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Close from '@material-ui/icons/CloseRounded';

import styles from '../assets/jss/material-dashboard-react/components/sidebarStyle.js';

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
  let location = useLocation();
  function activeRoute(routeName) {
    if (routeName === '/dashboard') {
      return location.pathname === routeName || location.pathname === '/';
    }
    return location.pathname === routeName;
  }

  var links = (
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
