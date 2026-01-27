import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Footer, Sidebar, Navbar } from '../components';
import { dashboardRoutes } from '../Router.js';
import { Dashboard, Profile, Summary } from '../views';
import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js';

const useStyles = makeStyles(styles);

export default function Home() {
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
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={dashboardRoutes}
          handleDrawerToggle={handleDrawerToggle}
        />

        <div className={classes.content}>
          <div className={classes.container}>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='profile' element={<Profile />} />
              <Route path='summary' element={<Summary />} />
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
