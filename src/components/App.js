import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Menu from './menu';
import Board from './board';

import './stylesheets/App.css';


const App = () => {
  return (
    <div className='app-container'>
      <div className='game-header'>
        <h2 className='title'>Tarot Cards Memory</h2>
      </div>

      <Switch>
          <Route exact path="/" render={() => <Redirect to="/menu" />} />

          <Route exact path='/menu' component={Menu} />
          <Route path='/board' component={Board} />
      </Switch>

    </div>
  );
}

export default withRouter(App);
