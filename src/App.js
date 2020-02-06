import React from 'react';
import { Router, Route } from "react-router-dom";
import History from './services/history';
import { ThemeContextProvider } from './theme/theme-context';
import { ThemeToggle } from './theme/ThemeToggle/ThemeToggle';
import UserLogin from './authentication/UserLogin/UserLogin';
import AuthenticationContext from './authentication/authentication-context';
import Login from './authentication/Login';
import Logout from './authentication/Logout';
import AuthenticatedRoute from './authentication/AuthenticatedRoute/AuthenticatedRoute';
import JYB from './components/JYB';
import ThemeWrapper from './theme/ThemeWrapper/ThemeWrapper';

export default function App() {

  return (
    <ThemeContextProvider>
      <ThemeWrapper>
        <AuthenticationContext.Provider>
          <div className="container">
            <UserLogin />
            <ThemeToggle />
            <Router history={History}>
              <Route exact path='/login' component={Login} />
              <Route exact path='/logout' component={Logout} />
              <Route exact path='/' render={() => <>Home</>} />
              <AuthenticatedRoute exact path='/admin' component={JYB} roles={["admin"]} />
              <AuthenticatedRoute exact path='/admin2' component={() => <>Admin2</>} roles={["admin"]} />
            </Router>

          </div>
        </AuthenticationContext.Provider>
      </ThemeWrapper>
    </ThemeContextProvider>
  )
}