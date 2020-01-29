import React from 'react';
import { Router, Route } from "react-router-dom";
import History from './services/history';
import ThemeContext from './contexts/themes';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';

export default function App() {
  return (
    <ThemeContext.Provider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className={`app theme-${theme}`}>
            <div className="container">
              <Router history={History}>
                <Route exact path='/' component={ThemeToggle} />
              </Router>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
}