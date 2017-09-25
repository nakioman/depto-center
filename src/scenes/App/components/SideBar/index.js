import React from 'react';
import { Link } from 'react-router-dom';

import NavLink from '../../../../components/NavLink';

import NavBarBackground from './assets/background.jpg';
import Logo from '../../../../assets/logo.svg';

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
          <a className="nav-link" href="#logout" >Cerrar sesión</a>
        </li>
        <li className="dropdown-divider" role="separator" />
      </div>
      <NavLink to="/" ><i className="fa fa-home" />Inicio</NavLink>
    </ul>
  </nav>
);

export default SideBar;
