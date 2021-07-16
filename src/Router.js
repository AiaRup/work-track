import React, { useContext, lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';

// import DashboardPage from 'views/Dashboard/Dashboard.js';
// import UserProfile from 'views/UserProfile/UserProfile.js';
// import TableList from 'views/TableList/TableList.js';

import { AppContext } from './contexts';

const Login = lazy(async () => await import('./pages/Login'));
const SignUp = lazy(async () => await import('./pages/SignUp'));
const Home = lazy(async () => await import('./pages/Home'));
const NotFound = <div>Not Found</div>;

export const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    exact: true
  },
  {
    name: 'not-found',
    path: '*',
    component: NotFound,
    parent: 'home',
    exact: false
  }
];

export const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: NotFound,
    layout: '/home'
  },
  {
    path: '/user',
    name: 'User Profile',
    icon: Person,
    component: NotFound,
    layout: '/home'
  },
  {
    path: '/table',
    name: 'Table List',
    icon: 'content_paste',
    component: NotFound,
    layout: '/home'
  }
];

export const Router = () => {
  const { user } = useContext(AppContext);

  return (
    <Suspense fallback={<span>loading...</span>}>
      <BrowserRouter>
        {user ? (
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.name}
                path={route.path}
                exact={route.exact}
                render={(props) => (
                  <route.component {...props} {...route.props} route={route} />
                )}
              />
            ))}
          </Switch>
        ) : (
          <Switch>
            <Route path='/signup' component={SignUp} />
            <Route exect path='/' component={Login} />
          </Switch>
        )}
      </BrowserRouter>
    </Suspense>
  );
};
