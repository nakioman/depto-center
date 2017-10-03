import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import { graphql, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { createUser, userQuery } from '../../services/queries/User';

import './styles.css';

const Loading = '//res.cloudinary.com/depto-center/image/upload/f_auto,fl_force_strip.progressive,q_auto,w_auto,c_scale/v1506634397/web-assets/loading.gif'
const Logo = '//res.cloudinary.com/depto-center/image/upload/f_auto,fl_force_strip.progressive,q_auto,w_auto,c_scale/v1506634397/web-assets/logo.svg';
const Background = '//res.cloudinary.com/depto-center/image/upload/f_auto,fl_force_strip.progressive,q_auto,w_auto,c_scale/v1506634397/web-assets/login_bg.jpg';

// Flow will be redirected to /login-callback.html after successful login
const serverUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
const redirectUrl = serverUrl + '/login';
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const domain = process.env.REACT_APP_AUTH0_DOMAIN;

class Login extends Component {
  setupAuthLock = () => {
    const that = this;
    const lock = new Auth0Lock(clientId, domain, {
      language: 'es',
      closable: false,
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
        scope: 'openid email',
        redirectUrl,
      },
    });

    lock.on('authenticated', authResult => {
      this.card.style.visibility = 'visible';
      lock.getUserInfo(authResult.accessToken, function (error, profile) {
        if (error) {
          lock.show({
            flashMessage: {
              type: 'error',
              text: error.error_description,
            }
          });
          return;
        }

        localStorage.setItem('auth0IdToken', authResult.idToken);
        that.props.client.query({ query: userQuery }).then(response => {
          if (response.data.user && response.data.user.id) {
            that.props.history.replace('/');
          } else {
            const variables = {
              idToken: authResult.idToken,
              name: profile.name,
              emailAddress: profile.email
            };
            that.props.createUser({ variables }).then(() => {
              that.props.history.replace('/');
            }).catch((error) => {
              console.error(error);
              localStorage.clear();
              lock.show({
                flashMessage: {
                  type: 'error',
                  text: 'Hubo un error creando el usuario, intente de nuevo o contacte al administrador',
                }
              });
            });
          }
        }).catch(error => {
          localStorage.clear();
          console.log(error);
          lock.show({
            flashMessage: {
              type: 'error',
              text: 'Hubo un error creando el usuario, intente de nuevo o contacte al administrador',
            }
          });
        })

      });
    });
    lock.on('authorization_error', error => {
      lock.show({
        flashMessage: {
          type: 'error',
          text: error.error_description,
        }
      });
    });
    lock.on('hash_parsed', hash => {
      if (!hash) {
        lock.show();
      }
    });
  }
  componentWillMount() {
    if (localStorage.getItem('auth0IdToken')) {
      this.props.history.replace('/');
    } else {
      this.setupAuthLock();
    }
  }
  render() {
    return (
      <div className="page-header filter-color" >
        <div className="page-header-image" style={{ backgroundImage: `url(${Background})` }} />
        <div className="container" >
          <div className="row justify-content-sm-center content-center" style={{ margin: 0 }}>
            <div className="col-sm-4">
              <div className="card" ref={input => this.card = input} style={{ visibility: 'hidden' }} >
                <div className="content" >
                  <img src={Loading} alt="Procesando ingreso..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(graphql(createUser, { name: 'createUser' })(withRouter(Login)));
