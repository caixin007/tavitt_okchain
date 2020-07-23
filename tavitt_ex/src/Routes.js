import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout } from './layouts';

import {
  Homepage as HomepageView,
  Account as AccountView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={HomepageView}
        exact
        layout={MainLayout}
        path="/"
      />
      <RouteWithLayout
        component={() => <div>test</div>}
        exact
        layout={MainLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  )
}

export default Routes;
