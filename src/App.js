import React from 'react';
import { Router, Route } from "react-router-dom";
import History from './services/history';
import Navigation from './components/Navigation';
import Candidates from './components/Candidates';
import Instruments from './components/Instruments';

function App() {
  return (
    <div className="app">
      <Router history={History}>
        <Navigation />

        <div className="tt-body">
          <Route exact path='/' component={Instruments} />
          <Route exact path='/instrument' component={Instruments} />
          <Route exact path='/candidate' component={Candidates} />

        </div>

      </Router>
    </div>
  );
}

export default App;
