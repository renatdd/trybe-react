import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import { LOGIN_PATH, WALLET_PATH } from './paths';

export default class App extends Component {
  renderRoutes() {
    return (
      <Switch>
        <Route exact path={ LOGIN_PATH } component={ Login } />
        <Route path={ WALLET_PATH } component={ Wallet } />
      </Switch>
    );
  }

  render() {
    return (
      <>
        { this.renderRoutes() }
      </>
    );
  }
}
