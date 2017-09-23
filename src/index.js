import React from 'react';
import ReactDOM from 'react-dom';

import './theme/App.css';
import App from './scenes/App';
import registerServiceWorker from './registerServiceWorker';

require('bootstrap');
require('bootstrap-switch');
require('nouislider');
require('bootstrap-datepicker');
require('./now-ui-kit');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
