import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { asyncComponent } from '../../services/helpers';
import PublicLayout from './publicLayout';
import PrivateLayout from './privateLayout';

const Admin = asyncComponent(() => import('../Admin').then(module => module.default));
const Login = asyncComponent(() => import('../Login').then(module => module.default));
const NotFound = asyncComponent(() => import('../NotFound').then(module => module.default));

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
