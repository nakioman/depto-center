import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';

import './styles.css';
import Background from './assets/background.jpg';
import Logo from './assets/logo.svg';

const language = () => {
    let language = navigator.languages
        ? navigator.languages[0]
        : (navigator.language || navigator.userLanguage);
    if (language.indexOf('-') !== -1) {
        language = language.split('-')[0];
    }
    return language;
}
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const lock = new Auth0Lock(clientId, domain, {
    closable: false,
    language: language(),
    mustAcceptTerms: true,
    theme: {
        logo: Logo,
        primaryColor: '#38843B',
    },
    languageDictionary: {
        signUpTerms: "Estoy de acuerdo con los <a href='/terms' target='_new'>términos del servicio</a> y la <a href='/privacy' target='_new'>política de privacidad</a>.",
        title: '',
    },
});

class Login extends Component {
    componentDidMount() {
        lock.show();
    }
    render() {
        return (
            <div style={{
                background: `url(${Background}) no-repeat center center fixed`,
                height: '100vh',
                width: '100vw',
                backgroundSize: 'cover',
            }} />
        );
    }
}

export default Login;
