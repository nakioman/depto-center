import { Component } from 'react';
import { WebAuth } from 'auth0-js';

const serverUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth0 = new WebAuth({ clientID, domain });


class SilentCallback extends Component {
  componentDidMount() {
    auth0.parseHash(window.location.hash, function (err, result) {
      window.parent.postMessage(err || result, serverUrl);
    });
  }
  render() {
    return 'Auth0 callback';
  }
}

export default SilentCallback;
