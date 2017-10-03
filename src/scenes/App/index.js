import React from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { decode as jwtDecode } from 'jsonwebtoken';
import { WebAuth } from 'auth0-js';

import Router from './router';
import { logout } from '../../services/helpers';

const serverUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
const redirectUri = serverUrl + '/silent-callback';
const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth0 = new WebAuth({ clientID, domain });

const getValidToken = () => {
  return new Promise((resolve, reject) => {
    try {
      const token = localStorage.getItem('auth0IdToken');
      const decodedToken = jwtDecode(token);
      const expirationDate = new Date(decodedToken.exp * 1000);
      const actualDate = new Date();

      if (expirationDate > actualDate) {
        resolve(token);
      } else {
        auth0.renewAuth({
          responseType: 'token id_token',
          scope: 'openid email',
          usePostMessage: true,
          redirectUri,
        }, (err, authResult) => {
          if (err || !authResult.idToken) {
            reject(err);
          } else {
            localStorage.setItem('auth0IdToken', authResult.idToken);
            resolve(authResult.idToken);
          }
        });
      }
    } catch (error) {
      reject(error);
    }
  });
}

const networkInterface = createNetworkInterface({ uri: process.env.REACT_APP_GRAPH_QL_URI });
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('auth0IdToken')) {
      getValidToken().then(token => {
        req.options.headers.authorization = `Bearer ${token}`;
        next();
      }).catch(err => {
        console.log(err);
        logout(client);
      });
    }
  },
}]);

const client = new ApolloClient({ networkInterface });

const App = () => (
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>
);

export default App;
