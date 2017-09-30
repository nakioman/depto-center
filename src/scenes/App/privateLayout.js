import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import { asyncComponent } from '../../services/helpers';
import notificationStyles from './notificationStyles';
import './styles.css';

const NavBar = asyncComponent(() => import('./components/NavBar').then(module => module.default));
const SideBar = asyncComponent(() => import('./components/SideBar').then(module => module.default));
const Footer = asyncComponent(() => import('../../components/Footer').then(module => module.default));

class PrivateLayout extends Component {
  state = {
    openNavBar: false,
  };
  toggleNavBar = (event) => {
    this.setState({ openNavBar: !this.state.openNavBar })
  }
  componentDidMount() {
    this.setState({ _notificationSystem: this.notificationSystem })
  }
  render() {
    const { component: Component, ...rest } = this.props;
    if (localStorage.getItem('auth0IdToken')) {
      return (
        <Route {...rest} render={matchProps => (
          <div className={this.state.openNavBar ? 'wrapper nav-open' : 'wrapper'} onClick={() => this.state.openNavBar && this.toggleNavBar()}  >
            <SideBar />
            <div className="main-panel" ref={input => this.mainPanel = input}>
              <NavBar toggleNavBar={this.toggleNavBar} openNavBar={this.state.openNavBar} />
              <div className="content">
                <div className="col-xs-11 col-sm-4 fadeInDown">
                  <NotificationSystem ref={notificationSystem => this.notificationSystem = notificationSystem} style={notificationStyles} />
                </div>
                <Component {...matchProps } notificationSystem={this.state._notificationSystem} />
              </div>
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
