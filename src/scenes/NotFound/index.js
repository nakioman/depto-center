import React from 'react';
import { Link } from 'react-router-dom';

import Background from './assets/background.jpg';

const NotFound = ({ footerHeight }) => (
  <div className="page-header filter-color" style={{ height: `calc(100vh - ${footerHeight}px)` }}>
    <div className="page-header-image" style={{ backgroundImage: `url(${Background})` }} />
    <div className="container" >
      <div className="col-md-6 content-center">
        <div className="card card-plain" >
          <div className="content">
            <h1 style={{ fontSize: '10em' }}>Oops!</h1>
            <h6>No podemos encontrar la página que estas buscando</h6>
          </div>
          <div className="footer">
            <Link to="/" className="btn btn-primary btn-round btn-lg">Ir al inicio</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
