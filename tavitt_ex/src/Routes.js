import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout } from './layouts';

import {
  Homepage as HomepageView,
  Account as AccountView,
  Transaction as TransactionView,
  Projects as ProjectsView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={ProjectsView}
        exact
        layout={MainLayout}
        path="/projects"
      />
      <RouteWithLayout
        component={TransactionView}
        exact
        layout={MainLayout}
        path="/transaction"
      />
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
        component={() => <div>not-found</div>}
        exact
        layout={MainLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  )
}

export default Routes;
