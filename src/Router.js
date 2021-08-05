import React, { useContext, lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import { FormattedMessage } from 'react-intl';

import { Dashboard as DashboardPage, Profile, Summary } from './views';
import Loading from './pages/Loading';
import { AppContext } from './contexts';
import { getUserByAuthId, firebaseAuth } from './services/firebase';

const Login = lazy(async () => await import('./pages/Login'));
const SignUp = lazy(async () => await import('./pages/SignUp'));
const Home = lazy(async () => await import('./pages/Home'));

export const dashboardRoutes = [
  {
    path: 'dashboard',
    name: <FormattedMessage id='dashboard' />,
    icon: Dashboard,
    component: DashboardPage,
    layout: '/'
  },
  {
    path: 'summary',
    name: <FormattedMessage id='summary' />,
    icon: 'content_paste',
    component: Summary,
    layout: '/'
  },
  {
    path: 'profile',
    name: <FormattedMessage id='profile' />,
    icon: Person,
    component: Profile,
    layout: '/'
  }
];

export const Router = () => {
  const { user, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(function (currentUser) {
      if (currentUser) {
        getUserByAuthId(currentUser.uid).then((snapshot) => {
          const signedUser = snapshot.docs[0]?.data();
          dispatch({ type: 'SET_USER', payload: signedUser });
          setLoading(false);
        });
      } else {
        console.log('no user is signed in');
        setLoading(false);
      }
    });
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={Loading}>
      <BrowserRouter>
        {user ? (
          <Route path='/' component={Home} />
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
