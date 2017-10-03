import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { asyncComponent } from '../../services/helpers';
import PublicLayout from './publicLayout';
import PrivateLayout from './privateLayout';

const Admin = asyncComponent(() => import('../Admin').then(module => module.default));
const Login = asyncComponent(() => import('../Login').then(module => module.default));
const NotFound = asyncComponent(() => import('../NotFound').then(module => module.default));
const AddApartment = asyncComponent(() => import('../Apartment/Add').then(module => module.default));
const ApartmentDetail = asyncComponent(() => import('../Apartment/Detail').then(module => module.default));
const EditApartment = asyncComponent(() => import('../Apartment/Edit').then(module => module.default));
const SilentCallback = asyncComponent(() => import('../SilentCallback').then(module => module.default));

const Router = () => (
  <BrowserRouter>
    <Switch>
      <PrivateLayout exact path="/" component={Admin} />
      <PrivateLayout path="/apartment/edit/:id" component={EditApartment} />
      <PrivateLayout path="/apartment/:id" component={ApartmentDetail} />
      <PrivateLayout path="/apartment" component={AddApartment} />

      <PublicLayout path="/login" component={Login} />
      <PublicLayout path="/silent-callback" component={SilentCallback} />      
      <PublicLayout path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
