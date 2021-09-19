import { useState } from 'react';
import { login } from './api/api';

import logo from './logo.svg';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import CalculatorUI from './components/CalculatorUI';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Client from './pages/Client';
import UploadTest from './components/UploadTest';
import Admin from './pages/Admin';
import { 
  CssBaseline,
  Button,
} from '@material-ui/core';

import {
  Router,
  Switch,
  Route,
  Redirect,
  Link
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

      <Router history={history}>
          <Switch>
              <Route  path="/client">
                  <Client history={history}/>
              </Route>
              <Route  path="/admin_home">
                  <Admin history={history}/>
              </Route>
              <Route  path="/">
                  <Auth history={history} saveToken={saveToken} />
              </Route>
          </Switch>
      </Router>
    </>
  );
}

export default App;
