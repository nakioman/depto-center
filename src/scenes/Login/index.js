import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';

import './styles.css';
import Background from '../../assets/background.jpg';
import Logo from '../../assets/logo.svg';

const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const lock = new Auth0Lock(clientId, domain, {
  container: 'auth0-lock',
  language: 'es',
  mustAcceptTerms: true,
  theme: {
    logo: Logo,
    primaryColor: '#38843B',
  },
  languageDictionary: {
    signUpTerms: "Estoy de acuerdo con los <a href='/terms' target='_new'>términos del servicio</a> y la <a href='/privacy' target='_new'>política de privacidad</a>.",
    title: '',
  },
  socialButtonStyle: 'big',
  auth: {
    responseType: 'token id_token',
    scope: 'openid email'
  },
});

class Login extends Component {
  state = {
    errorMessage: null
  };

  componentWillMount() {
    lock.on('authenticated', authResult => {
      lock.getUserInfo(authResult.accessToken, function (error, profile) {
        if (error) {
          // Handle error
          this.setState({ errorMessage: error.error_description });
          return;
        }

        console.log(profile);
        console.log(authResult);

        // localStorage.setItem("accessToken", authResult.accessToken);
        // localStorage.setItem("profile", JSON.stringify(profile));

        // Update DOM
      });
    });
    lock.on('authorization_error', error => {
      this.setState({ errorMessage: error.error_description });
    });
  }
  componentDidMount() {
    lock.show();
  }
  render() {
    return (
      <div className="page-header filter-color">
        <div className="page-header-image" style={{ backgroundImage: `url(${Background})` }} />
        <div className="alert alert-danger" role="alert"
          style={{
            visibility: this.state.errorMessage ? 'visible' : 'hidden',
            position: 'absolute',
            width: '100%'
          }}>
          <div className="container text-left">
            {this.state.errorMessage}
          </div>
        </div>
        <div className="container" >
          <div className="col-md-6 content-center">
            <div className="card card-plain" >
              <div className="content" id="auth0-lock" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
