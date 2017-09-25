import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth0Lock from 'auth0-lock';

const logout = (history) => {
  const serverUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
  const redirectUrl = serverUrl + '/';
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const lock = new Auth0Lock(clientId, domain);

  lock.logout({ returnTo: redirectUrl });
  localStorage.clear();
}

const $ = window.$;

class NavBar extends Component {

  render() {
    return (
      <header className="navbar bg-primary row">
        <div className="container-fluid">
          <div className="navbar-translate">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className={this.props.openNavBar ? 'navbar-toggler toggled' : 'navbar-toggler'} type="button" onClick={this.props.toggleNavBar} >
              <span className="navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </button>
          </div>
          <div className="justify-content-end d-none d-lg-block" >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#logout" >Cerrar sesión</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default NavBar;
