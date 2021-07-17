import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Footer, Sidebar, Navbar } from '../components';
import { dashboardRoutes } from '../Router.js';
import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js';

const useStyles = makeStyles(styles);

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.layout === '/home') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from='/home' to='/home/dashboard' />
  </Switch>
);

export const Home = ({ ...rest }) => {
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('resize', resizeFunction);
    return function cleanup() {
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={dashboardRoutes}
        logoText={'Work Tracker'}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color='gray'
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={dashboardRoutes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />

        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
