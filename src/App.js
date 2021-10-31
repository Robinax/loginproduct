import {useEffect, useState} from 'react';
import {BrowserRouter,Switch,Route,NavLink} from "react-router-dom"
import './App.css';
import Dashboard from './Dashboard';
import Home from './Home';
import Login from './Login';
import Register from './Register';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
          <NavLink activeClassName="active" to="/login">Login</NavLink>
          <NavLink activeClassName="active" to="/register">Register</NavLink>
        </div>

        <div className="content">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard}/>
          </Switch>
        </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
