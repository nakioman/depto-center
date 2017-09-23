import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Admin from '../Admin';
import Login from '../Login';
import NotFound from '../NotFound';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Admin} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;
