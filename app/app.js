/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import App from 'containers/App';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/react-bootstrap/dist/react-bootstrap.min';

// Import root app
const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <div>
      <App />
    </div>,
    MOUNT_NODE
  );
};

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
