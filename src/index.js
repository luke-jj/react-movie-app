import React from 'react';
import { render } from 'react-dom';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'font-awesome/css/font-awesome.css';
import './styles/main.scss';

import { checkConfig } from './config';
import logger from './services/logService';
import App from './app';

checkConfig();
logger.init();

render(<App />, document.getElementById('root'));
