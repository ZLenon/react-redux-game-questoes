import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Configuracoes from './Pages/Configuracoes';
import Login from './Pages/Login';
import Game from './Pages/Game';
import Feedback from './Pages/Feedback';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Configuracoes } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default App;
