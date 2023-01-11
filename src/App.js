import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Configuracoes from './Pages/Configuracoes';
import Login from './Pages/Login';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Configuracoes } />
      </Switch>
    );
  }
}

export default App;
