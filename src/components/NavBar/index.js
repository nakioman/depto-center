import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.svg';

const NavBar = () => (
  <nav className="navbar navbar-expand-lg bg-primary fixed-top " data-color-on-scroll="400">
    <div className="container">
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
      <div className="collapse navbar-collapse justify-content-end" id="navigation" data-nav-image="../assets/img/blurred-image-1.jpg">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#pablo">
              <p>Link</p>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#pablo">
              <p>Link</p>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" rel="noopener noreferrer" title="Follow us on Twitter" data-placement="bottom" href="https://twitter.com/CreativeTim" target="_blank" >
              <i className="fa fa-twitter"></i>
              <p className="d-lg-none d-xl-none">Twitter</p>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" rel="noopener noreferrer" title="Like us on Facebook" data-placement="bottom" href="https://www.facebook.com/CreativeTim" target="_blank">
              <i className="fa fa-facebook-square"></i>
              <p className="d-lg-none d-xl-none">Facebook</p>
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" rel="tooltip" title="Perfil" data-placement="bottom" to="/profile" >
              <i className="fa fa-user"></i>
              <p className="d-lg-none d-xl-none">Perfil</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavBar;
