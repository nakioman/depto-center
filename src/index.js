import React from 'react';
import ReactDOM from 'react-dom';

import './theme/App.css';
import App from './scenes/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
