import React from 'react';
import { Router, Route } from "react-router-dom";
import History from './services/history';
import Navigation from './components/Navigation';
import Candidate from './components/Candidate';

function App() {
  return (
    <div className="app">
      <Router history={History}>
        <Navigation />

        <div className="tt-body">
          <Route exact path='/' render={() => {
            return (<div className="heading">Home</div>)
          }} />

          <Route exact path='/candidate' component={Candidate} />

        </div>

      </Router>
    </div>
  );
}

export default App;
