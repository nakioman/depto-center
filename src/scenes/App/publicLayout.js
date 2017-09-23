import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Footer from '../../components/Footer';

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
    this.setState({ footerHeight: this.footer.height() });
  }
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={matchProps => (
        <div className="wrapper">
          <Component {...matchProps } footerHeight={this.state.footerHeight} />
          <Footer ref={input => this.footer = input} />
        </div>
      )} />
    );
  }
}
export default PublicLayout;
