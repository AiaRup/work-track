import React, { useContext, lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AppContext } from './contexts';

const Login = lazy(async () => await import('./pages/Login'));
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
            <Route path='/' component={Login} />
          </Switch>
        )}
      </BrowserRouter>
    </Suspense>
  );
};
