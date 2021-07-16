import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Footer, Sidebar, Navbar } from '../components';
import { dashboardRoutes } from '../Router.js';
import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js';
import bgImage from '../assets/img/sidebar-2.jpg';
import logo from '../assets/img/reactlogo.png';

import { Modal, Tabs } from '../components';

const useStyles = makeStyles(styles);

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.layout === '/admin') {
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
    <Redirect from='/admin' to='/admin/dashboard' />
  </Switch>
);

const Home = ({ ...rest }) => {
  const [modalVisible, setmodalVisible] = useState(true);
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState('blue');

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
    <>
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={'Creative Tim'}
          logo={logo}
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
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
      <Modal visible={modalVisible} />
    </>
  );
};

export default Home;
