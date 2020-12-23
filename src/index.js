import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthPage from "./components/AuthPage/"
import store from './store'




const Rout =(props)=>{
  return (<Router>
    <Switch>
      <Route exact path="/" render={()=><App store={store}/>}/>
      <Route  path="/auth" render={()=><AuthPage store={store}/>}/>
    </Switch>
  </Router>)
}


ReactDOM.render(<Rout store={store}/>, document.getElementById('root'));
