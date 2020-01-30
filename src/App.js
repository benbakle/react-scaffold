import React, { useEffect, useState } from 'react';
import { Router, Route } from "react-router-dom";
import History from './services/history';
import ThemeContext from './contexts/themes';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';

export default function App() {

  const [weather, setWeather] = useState([]);
  const [api, setApi] = useState("weatherforecast");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://localhost:44330/${api}`, { method: 'GET' })
        .then(res => { return res.json() })
        .then(json => { return json })
        .catch(e => console.log(":::ERROR:::", e));

      setWeather(response);
    }

    fetchData();
  }, [api]);

  return (
    <ThemeContext.Provider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className={`app theme-${theme}`}>
            <div className="container">
              <Router history={History}>
                <Route exact path='/' component={ThemeToggle} />
              </Router>

              <label>{`https://localhost:44330/${api}`}</label>
              <input onChange={(e) => { setApi(e.target.value) }} value={api} />

              <ul>
                {weather && weather.map((item, key) =>
                  <li key={key}>{item.summary}</li>
                )}
              </ul>

            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
}