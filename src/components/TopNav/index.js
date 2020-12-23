import React from "react";
import store from "../../store.js"

import './index.css';
import Icons from "../Icons/"

class TopNav extends React.Component{
  constructor(){
    super();

  }
  componentWillMount(){
    
    
  }

  render(){
  const {user} = store.getState().currentCollection;
  
  return (
    <div className="TopNav">
    <img onClick={e=>{
      if(window.innerWidth<660){
      const _t = document.querySelector("#left-wrapper");
      
      _t.style.display = (_t.style.display=="none"||_t.style.display=="")?"flex":"none"
      }
    }} style={{cursor:"pointer"}} className="navBtn" src={Icons.navBtn} alt={"NavBtn"}/>
    <div className={"ActiveUser"}>
    {user}
    <div className="isTyping"></div>
    </div>
   
    </div>
  )
  }
}

export default TopNav;