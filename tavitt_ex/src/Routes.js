import React from 'react';
import { Switch, Redirect, useLocation } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout } from './layouts';

import {
  Homepage as HomepageView,
  Account as AccountView
} from './views';

const Routes = () => {
  const location = useLocation()
  console.log(location)
  return (
    <div key={location.key}>
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
        <Redirect from={"*"} to={'/'} />
        {/* <Redirect to="/not-found" /> */}
      </Switch>
    </div>
  )
}

export default Routes;
