import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthPage from "./components/AuthPage/"
import store from './store'




const Rout =(props)=>{
  let [isAuth, setAuth] = useState(store.getState().isAuth);
  store.subscribe(()=>{
    setAuth(store.getState().isAuth);
  })
  return (<>
      {isAuth?<App store={store}/>:
     <AuthPage store={store}/>}
  </>
  )
}


ReactDOM.render(<Rout store={store}/>, document.getElementById('root'));
