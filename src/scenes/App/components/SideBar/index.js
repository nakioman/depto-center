import React from 'react';
import { Link } from 'react-router-dom';
import { withApollo, graphql } from 'react-apollo';

import { allApartmentsQuery } from '../../../../services/queries/Apartment';
import NavLink from '../../../../components/NavLink';
import { logout } from '../../../../services/helpers';

const Logo = '//res.cloudinary.com/depto-center/image/upload/f_auto,fl_force_strip.progressive,q_auto,w_auto,c_scale/v1506634397/web-assets/logo.svg';
const NavBarBackground = '//res.cloudinary.com/depto-center/image/upload/f_auto,fl_force_strip.progressive,q_auto,w_auto,c_scale/v1506634397/web-assets/sidebar_bg.jpg';

const SideBar = ({ client, data, ...props }) => (
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
      {data.loading &&
        <li className="nav-item disabled">
          <a className="nav-link disabled text-center">
            <i className="fa fa-spinner fa-spin fa-fw" />
          </a>
        </li>
      }
      {data.allApartments && data.allApartments.apartments.map(item => (
        <NavLink to={`/apartment/${item.id}`} key={item.id} className="subitem" >{item.address}</NavLink>
      ))}
      <NavLink to="/apartment" className="subitem" ><i className="fa fa-plus" />Agregar</NavLink>
    </ul>
  </nav>
);

export default withApollo(graphql(allApartmentsQuery)(SideBar));
