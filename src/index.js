import React from 'react';
import ReactDOM from 'react-dom';

import './theme/App.css';
import Router from './scenes/Router';
import registerServiceWorker from './registerServiceWorker';

require('bootstrap');
require('bootstrap-switch');
require('nouislider');
require('bootstrap-datepicker');
require('../node_modules/now-ui-kit/assets/js/now-ui-kit');

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
