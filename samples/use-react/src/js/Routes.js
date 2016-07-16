import React from 'react'; // eslint-disable-line no-unused-vars
import { Route, IndexRoute } from 'react-router';
import MainAppPage from './components/MainAppPage';
import MainApp from './components/MainApp';

const Routes = (
  <Route path="/" component={MainAppPage}>
    <IndexRoute component={MainApp} />
  </Route>
);

export default Routes;
