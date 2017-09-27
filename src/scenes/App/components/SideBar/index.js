import React from 'react';
import { Link } from 'react-router-dom';
import Auth0Lock from 'auth0-lock';

import NavLink from '../../../../components/NavLink';
import NavBarBackground from './assets/background.jpg';
import Logo from '../../../../assets/logo.svg';

const logout = (history) => {
  const serverUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
  const redirectUrl = serverUrl + '/';
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const lock = new Auth0Lock(clientId, domain);

  lock.logout({ returnTo: redirectUrl });
  localStorage.clear();
}

const SideBar = () => (
  <nav className="navbar sidebar bg-dark" >
    <div className="background-image" style={{ backgroundImage: `url(${NavBarBackground})` }} />
    <div className="navbar-brand">
      <Link to="/" >
        <img src={Logo} alt="Depto center" height="40" />
      </Link>

    </div>
    <ul className="navbar-nav">
      <div className="d-lg-none">
        <li className="nav-item">
          <a className="nav-link" href="" onClick={logout} >Cerrar sesión</a>
        </li>
        <li className="dropdown-divider" role="separator" />
      </div>
      <NavLink to="/" ><i className="fa fa-home" />Inicio</NavLink>
    </ul>
  </nav>
);

export default SideBar;
