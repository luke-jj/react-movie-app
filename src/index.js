import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import logger from './services/logService';
import './index.css';
import App from './app';

logger.init();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
