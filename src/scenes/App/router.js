import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Admin from '../Admin';
import Login from '../Login';
import NotFound from '../NotFound';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('auth0IdToken') ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
);

const Router = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={Admin} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
