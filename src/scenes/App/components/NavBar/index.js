import React, { Component } from 'react';
import { withApollo } from 'react-apollo';

import { logout } from '../../../../services/helpers';

class NavBar extends Component {

  render() {
    return (
      <header className="navbar bg-primary row">
        <div className="container-fluid">
          <div className="navbar-translate">
            <span className="navbar-brand" style={{ userSelect: 'none', cursor: 'default', color: 'white' }}>{this.props.title}</span>
            <button className={this.props.openNavBar ? 'navbar-toggler toggled' : 'navbar-toggler'} type="button" onClick={this.props.toggleNavBar} >
              <span className="navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </button>
          </div>
          <div className="justify-content-end d-none d-lg-block" >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="" onClick={() => logout(this.props.client)} >Cerrar sesión</a>
              </li>
            </ul>
          </div>
        </div>
      </header >
    );
  }
}

export default withApollo(NavBar);
