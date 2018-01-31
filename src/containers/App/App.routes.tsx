import * as React from 'react';
import { Route } from 'react-router';

import HomePage from '../../pages/HomePage';

export default () => (
  <div>
    <Route exact path="/" component={HomePage} />
  </div>
);
