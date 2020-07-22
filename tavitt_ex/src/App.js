import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
// import ReactDOM from 'react-dom';
// import './App.css';
// import Routes from './Routes';
import theme from './theme';

import Homepage from 'screens/Homepage';

const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Homepage />
        </Router>
      </ThemeProvider>
    );
  }
}
