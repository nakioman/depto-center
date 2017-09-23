import React from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

import Router from './router';

const networkInterface = createNetworkInterface({ uri: process.env.REACT_APP_GRAPH_QL_URI });
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('auth0IdToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('auth0IdToken')}`
    }
    next()
  },
}]);

const client = new ApolloClient({ networkInterface })


const App = () => (
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>
);

export default App;
