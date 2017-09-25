import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { asyncComponent } from '../../services/helpers';

const Footer = asyncComponent(() => import('../../components/Footer').then(module => module.default));

require('bootstrap');

class PublicLayout extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={matchProps => (
        <div className="wrapper">
          <Component {...matchProps } />
          <div className="fixed-bottom">
            <Footer />
          </div>
        </div>
      )} />
    );
  }
}
export default PublicLayout;
