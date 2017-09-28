import React from 'react';
import { Link } from 'react-router-dom';
import Auth0Lock from 'auth0-lock';
import { withApollo } from 'react-apollo';

import NavLink from '../../../../components/NavLink';

const logout = (client) => {
  const serverUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
  const redirectUrl = serverUrl + '/';
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const lock = new Auth0Lock(clientId, domain);

  client.resetStore();
  lock.logout({ returnTo: redirectUrl });
  localStorage.clear();
}

const Logo = 'http://res.cloudinary.com/depto-center/image/upload/f_auto,fl_force_strip.progressive,q_auto,w_auto,c_scale/v1506634397/web-assets/logo.svg';
const NavBarBackground = 'http://res.cloudinary.com/depto-center/image/upload/f_auto,fl_force_strip.progressive,q_auto,w_auto,c_scale/v1506634397/web-assets/sidebar_bg.jpg';

const SideBar = ({ client }) => (
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
          <a className="nav-link" href="" onClick={() => logout(client)} >Cerrar sesión</a>
        </li>
        <li className="dropdown-divider" role="separator" />
      </div>
      <NavLink to="/" ><i className="fa fa-home" />Inicio</NavLink>
      <li className="dropdown-divider" role="separator" />
      <li className="nav-item disabled">
        <a className="nav-link disabled">
          <i className="fa fa-building" />Departamentos
     </a>
      </li>
      <NavLink to="/apartment" className="subitem" ><i className="fa fa-plus" />Agregar</NavLink>
    </ul>
  </nav>
);

export default withApollo(SideBar);
