import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Admin from '../Admin';

const Router = () => (
    <BrowserRouter>
        <Route path="/" component={Admin} />
    </BrowserRouter>
);

export default Router;