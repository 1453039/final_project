import React from 'react';
import ReactDOM from 'react-dom';
import Main from './router';
import { BrowserRouter as Router } from 'react-router-dom';

import '../public/styles/Layout.scss';
import '../public/styles/Typography.scss';
import '../public/styles/Common.scss';

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById('root')
);
