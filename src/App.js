import React from 'react';
import { Router, Route } from "react-router-dom";
import History from './services/history';
import Context from './components/ThemeToggle';
import { ThemeContextProvider, ThemeContextConsumer } from './contexts/themes';

export default function App() {
  return (
    <ThemeContextProvider>
      <ThemeContextConsumer>
        {({ theme }) => (
          <div className={`app theme-${theme}`}>
            <div className="container">
              <Router history={History}>
                <Route exact path='/' component={Context} />
              </Router>
            </div>
          </div>
        )}
      </ThemeContextConsumer>
    </ThemeContextProvider>
  );
}