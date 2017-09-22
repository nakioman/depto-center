import React, { Component } from 'react';

class Admin extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-primary fixed-top " data-color-on-scroll="400">
          <div className="container">
            <div className="navbar-translate">
              <a className="navbar-brand" href="http://demos.creative-tim.com/now-ui-kit/index.html" data-toggle="tooltip" rel="noopener noreferrer" title="Designed by Invision. Coded by Creative Tim" data-placement="bottom" target="_blank">
                Now Ui Kit
            </a>
              <button className="navbar-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
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
                  <a className="nav-link" rel="noopener noreferrer" title="Follow us on Instagram" data-placement="bottom" href="https://www.instagram.com/CreativeTimOfficial" target="_blank">
                    <i className="fa fa-instagram"></i>
                    <p className="d-lg-none d-xl-none">Instagram</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: '' }}>
            </div>
          </div>
          <div className="section"></div>
        </div>
        <footer className="footer">
          <div className="container">
            <nav>
              <ul>
                <li>
                  <a href="https://www.creative-tim.com">
                    Creative Tim
                        </a>
                </li>
                <li>
                  <a href="http://presentation.creative-tim.com">
                    About Us
                        </a>
                </li>
                <li>
                  <a href="http://blog.creative-tim.com">
                    Blog
                        </a>
                </li>
                <li>
                  <a href="https://github.com/creativetimofficial/now-ui-kit/blob/master/LICENSE.md">
                    MIT License
                        </a>
                </li>
              </ul>
            </nav>
            <div className="copyright">
              &copy;
                <script>
                document.write(new Date().getFullYear())
                </script>, Designed by
                <a href="http://www.invisionapp.com" target="_blank" rel="noopener noreferrer">Invision</a>. Coded by
                <a href="https://www.creative-tim.com" target="_blank" rel="noopener noreferrer">Creative Tim</a>.
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Admin;
