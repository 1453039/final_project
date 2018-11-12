import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
=======
import App from './App';
>>>>>>> 9d377cbf6eaaef32ad15c2329cd229288ac97470
import Main from './router';
import {Provider} from 'react-redux';
import {store} from './store';
import {BrowserRouter as Router} from 'react-router-dom';

import '../public/styles/Layout.scss';
import '../public/styles/Typography.scss';
import '../public/styles/Common.scss';

ReactDOM.render (
  <Provider store={store}>
    <Router>
      <Main/>
    </Router>
  </Provider>,
  document.getElementById ('root')
);
