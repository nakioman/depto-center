import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

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
    if (this.footer) {
      this.setState({ footerHeight: this.footer.height() });
    }
  }
  render() {
    const { component: Component, ...rest } = this.props;
    if (localStorage.getItem('auth0IdToken')) {
      return (
        <Route {...rest} render={matchProps => (
          <div>
            <NavBar />
            <div className="wrapper">
              <Component {...matchProps } footerHeight={this.state.footerHeight} />
              <Footer ref={input => this.footer = input} />
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
