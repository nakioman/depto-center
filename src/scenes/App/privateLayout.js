import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { asyncComponent } from '../../services/helpers';

const NavBar = asyncComponent(() => import('../../components/NavBar').then(module => module.default));
const Footer = asyncComponent(() => import('../../components/Footer').then(module => module.default));

require('bootstrap');

class PrivateLayout extends Component {
  state = {
    footerHeight: 100,
  };
  componentWillUpdate() {
    window.$('.tooltip').remove();
  }
  componentDidUpdate() {
    window.$('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  }
  componentDidMount() {
    window.$('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  }
  render() {
    const { component: Component, ...rest } = this.props;
    if (localStorage.getItem('auth0IdToken')) {
      return (
        <Route {...rest} render={matchProps => (
          <div>
            <NavBar />
            <div className="wrapper">
              <Component {...matchProps } />
              <Footer />
            </div>
          </div>
        )} />
      );
    }
    return (
      <Redirect to={{
        pathname: '/login',
        state: { from: this.props.location }
      }} />
    );
  }
}
export default PrivateLayout;
