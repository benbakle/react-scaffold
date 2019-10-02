import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/toolbox/typography.scss';
import './assets/css/toolbox/media-queries.scss';
import './assets/css/layouts/form-controls.scss';
import './assets/css/layouts/table.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
