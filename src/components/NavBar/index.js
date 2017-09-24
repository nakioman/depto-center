import React from 'react';
import { Link } from 'react-router-dom';
import Auth0Lock from 'auth0-lock';

import Logo from '../../assets/logo.svg';
import NavBarBackground from './assets/background.jpg';

const logout = (history) => {
  const serverUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
  const redirectUrl = serverUrl + '/';
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const lock = new Auth0Lock(clientId, domain);

  localStorage.removeItem('auth0IdToken');
  localStorage.removeItem('graphQLUserId');
  lock.logout({ returnTo: redirectUrl });
}

const NavBar = () => (
  <nav className="navbar navbar-expand-lg bg-primary fixed-top " data-color-on-scroll="400">
    <div className="container-fluid">
      <div className="navbar-translate">
        <Link to="/" >
          <img src={Logo} alt="Depto center" height="40" />
        </Link>
        <button className="navbar-toggler navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Activar/Desactivar la barra de navegación">
          <span className="navbar-toggler-bar bar1"></span>
          <span className="navbar-toggler-bar bar2"></span>
          <span className="navbar-toggler-bar bar3"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse justify-content-end" id="navigation" data-nav-image={NavBarBackground}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#logout" onClick={logout}>Cerrar sesión</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavBar;
