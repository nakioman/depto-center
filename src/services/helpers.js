import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';

// getComponent is a function that returns a promise for a component
// It will not be called until the first mount
export const asyncComponent = (getComponent) => {
  return class AsyncComponent extends Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        });
      }
    }
    render() {
      const { Component } = this.state
      const { component, ...props } = this.props;
      if (Component) {
        return <Component {...props} />
      }
      return null
    }
  }
}

export const waitApolloClientRefetch = async (apolloClient) => {
  await Promise.all(Object.values(apolloClient.queryManager.observableQueries).map(({ observableQuery }) => observableQuery.refetch(observableQuery.variables)))
}

export const logout = (apolloClient) => {
  const serverUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
  const redirectUrl = serverUrl + '/';
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const lock = new Auth0Lock(clientId, domain);

  apolloClient.resetStore();
  localStorage.clear();
  lock.logout({ returnTo: redirectUrl });
}
