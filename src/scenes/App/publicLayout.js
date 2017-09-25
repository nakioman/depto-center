import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { asyncComponent } from '../../services/helpers';

const Footer = asyncComponent(() => import('../../components/Footer').then(module => module.default));

require('bootstrap');

class PublicLayout extends Component {
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
    return (
      <Route {...rest} render={matchProps => (
        <div className="wrapper">
          <Component {...matchProps } />
          <Footer />
        </div>
      )} />
    );
  }
}
export default PublicLayout;
