import React from 'react';
import { Router, Route } from "react-router-dom";
import History from './services/history';
import ThemeContext from './contexts/themes';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import UserLogin from './authentication/UserLogin';
import AuthenticationContext from './authentication/authentication-context';
import Login from './authentication/Login';
import Logout from './authentication/Logout';

export default function App() {
  return (
    <ThemeContext.Provider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className={`app theme-${theme}`}>
            <AuthenticationContext.Provider>
              <div className="container">
                <UserLogin />
                <Router history={History}>
                  <Route exact path='/login' component={Login}/>
                  <Route exact path='/logout' component={Logout}/>

                  <AuthenticationContext.Consumer>
                    {({ isAuthenticated }) => (
                      <>
                        {
                          isAuthenticated && isAuthenticated() &&
                          <Route exact path='/' component={ThemeToggle} />
                        }
                      </>
                    )}
                  </AuthenticationContext.Consumer>
                </Router>
              </div>
            </AuthenticationContext.Provider>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  )
}