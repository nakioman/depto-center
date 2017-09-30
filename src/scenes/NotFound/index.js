import React from 'react';
import { Link } from 'react-router-dom';

const Background = '//res.cloudinary.com/depto-center/image/upload/f_auto,fl_force_strip.progressive,q_auto,w_auto,c_scale/v1506634397/web-assets/notfound_bg.jpg'

const NotFound = ({ footerHeight }) => (
  <div className="page-header filter-color" style={{ height: `calc(100vh - ${footerHeight}px)` }}>
    <div className="page-header-image" style={{ backgroundImage: `url(${Background})` }} />
    <div className="container" >
      <div className="col-md-6 content-center">
        <div className="card card-plain" >
          <div className="content">
            <h1>Oops!</h1>
            <p>No podemos encontrar la página que estas buscando</p>
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
