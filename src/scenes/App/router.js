import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import PublicLayout from './publicLayout';
import PrivateLayout from './privateLayout';

import Admin from '../Admin';
import Login from '../Login';
import NotFound from '../NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <PrivateLayout exact path="/" component={Admin} />

      <PublicLayout path="/login" component={Login} />
      <PublicLayout path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
