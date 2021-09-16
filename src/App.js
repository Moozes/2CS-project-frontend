import { useState } from 'react';

import logo from './logo.svg';
import Login from './components/Login';
import Signup from './components/Signup';
import CalculatorUI from './components/CalculatorUI';
import Navbar from './components/Navbar';
import { CssBaseline } from '@material-ui/core';
import {
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { createBrowserHistory } from "history"

const history = createBrowserHistory();


function App() {

  const [token , setToken] = useState(sessionStorage.getItem("token")? sessionStorage.getItem("token") : "");

  const saveToken = token => {
      sessionStorage.setItem("token", token);
      setToken(token);
  }

  return (
    <>
      <CssBaseline/>
      {/* <Login/> */}
      {/* <Signup/> */}

      {/* <Router history={history}>
          <Navbar/>
          <Switch>
              <Route exact path="/">
                  <Login history={history} saveToken={saveToken} />
              </Route>
              <Route path="/signup">
                  <Signup history={history} />
              </Route>
          </Switch>
      </Router> */}


      <CalculatorUI/>
    </>
  );
}

export default App;
