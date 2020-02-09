import React from 'react';
import { Router, Route } from "react-router-dom";
import History from './services/history';
import { ThemeContextProvider } from './theme/theme-context';
import { ThemeToggle } from './theme/ThemeToggle/ThemeToggle';
import UserLogin from './authentication/UserLogin/UserLogin';
import ThemeWrapper from './theme/ThemeWrapper/ThemeWrapper';

import { FacebookProvider, Login, Status, Share, Profile } from 'react-facebook';
import { jyb_app_id } from './authentication/authentication-config';
import AuthenticatedRoute from './authentication/AuthenticatedRoute/AuthenticatedRoute';

export default function App() {

  return (
    <ThemeContextProvider>
      <ThemeWrapper>
        <FacebookProvider appId={jyb_app_id}>

          <div className="container">

            <Router history={History}>
              <UserLogin />
              <ThemeToggle />
              <Route exact path='/' render={() => <>Home</>} />
              {/* {/* <AuthenticatedRoute exact path='/admin' component={JYB} roles={["admin"]} /> */}
              <AuthenticatedRoute exact path='/admin' component={() => <>Admin</>} roles={["admin"]} />
            </Router>

          </div>
        </FacebookProvider>
      </ThemeWrapper>
    </ThemeContextProvider>
  )
}