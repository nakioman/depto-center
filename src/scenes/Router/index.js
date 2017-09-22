import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Admin from '../Admin';
import Login from '../Login';
import NotFound from '../NotFound';

const Router = () => (
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Admin} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </div>
    </BrowserRouter>
);

export default Router;
