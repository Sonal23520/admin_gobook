/*
 * Copyright (c)  2021-2021, Sonal Sithara
 */

import 'simplebar/dist/simplebar.min.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));
