import React, { useState } from 'react';
import { Router, Route } from "react-router-dom";
import History from './services/history';
import { ThemeContextProvider } from './theme/theme-context';
import { ThemeToggle } from './theme/ThemeToggle/ThemeToggle';
import UserLogin from './authentication/UserLogin/UserLogin';
import ThemeWrapper from './theme/ThemeWrapper/ThemeWrapper';
import { FacebookProvider, MessageUs, Page, Initialize } from 'react-facebook';
import { jyb_app_id, messenger_app_id, messenger_jyb_page_id } from './authentication/authentication-config';
import AuthenticatedRoute from './authentication/AuthenticatedRoute/AuthenticatedRoute';

export default function App() {

  const doit = (api) => {
    console.log(api.ui("/me?accounts"));
    // const value = await api.api(jyb_app_id, 'Get', { "fields": "bio" });
    // console.log(value);
  }

  return (
    <FacebookProvider appId={jyb_app_id}
      cookie={true}
      xfbml={true}
      version='v6.0'
    >
      <ThemeContextProvider>
        <ThemeWrapper>
          <div className="container">

            <Router history={History}>
              <UserLogin />
              <ThemeToggle />

              {/* <div className="flex">
                <Page href="https://www.facebook.com/JoelYoungBand" tabs="timeline" />
                <Page href="https://www.facebook.com/JoelYoungBand" tabs="events" />
              </div> */}

              {/* <MessageUs messengerAppId={messenger_app_id} pageId={messenger_jyb_page_id} /> */}
              <Route exact path='/' render={() => <>Home</>} />

              {/* <AuthenticatedRoute exact path='/admin' component={JYB} roles={["admin"]} /> */}
              <AuthenticatedRoute exact path='/admin' component={() => <>Admin</>} roles={["admin"]} />
            </Router>
          </div>
        </ThemeWrapper>
      </ThemeContextProvider >
    </FacebookProvider>
  )
}