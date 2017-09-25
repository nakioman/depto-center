import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer footer-default fixed-bottom" ref={input => this.footer = input } >
        <div className="container">
          <div className="copyright">
            &copy; {new Date().getFullYear()}, Depto center
      </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
