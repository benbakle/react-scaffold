import React from 'react';
import { Router, Route } from "react-router-dom";
import History from './services/history';
import ThemeContext from './contexts/themes';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import Login from './authentication/Login';
import AuthenticationContext from './authentication/authentication-context';

export default function App() {

  return (
    <ThemeContext.Provider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className={`app theme-${theme}`}>
            <AuthenticationContext.Provider>
              <div className="container">
                <Login />
                <Router history={History}>
                  <Route exact path='/' component={ThemeToggle} />
                </Router>
              </div>
            </AuthenticationContext.Provider>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  )
}