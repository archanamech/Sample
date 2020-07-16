import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginPage from "./components/LoginPage/LoginPage";
import {HomePage} from './components/HomePage/HomePage';
import {PageNotFound} from './components/PageNotFound/PageNotFound';

function App() {
 
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={LoginPage}/>
          <Route path="/home" component={HomePage}/>
          <Route component={PageNotFound}/>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;

