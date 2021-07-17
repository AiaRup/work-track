import React, { useContext, lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';

import { Dashboard as DashboardPage } from './views';
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
    path: '/home',
    component: Home,
    exact: true
  }
];

export const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/home'
  },
  {
    path: '/summary',
    name: 'Summary',
    icon: 'content_paste',
    component: NotFound,
    layout: '/home'
  },
  {
    path: '/user',
    name: 'Profile',
    icon: Person,
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
            <Route path='/home' component={Home} />
            <Redirect from='/' to='/home/dashboard' />
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
