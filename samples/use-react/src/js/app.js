import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import Routes from './Routes';
import { hashHistory, Router } from 'react-router';

render(<Router history={hashHistory} routes={Routes} />,
  document.getElementById('main'));
