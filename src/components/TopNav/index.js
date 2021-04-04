import React from "react";
import store from "../../store.js"

import './index.css';
import Icons from "../Icons/"
import {db} from "../../service/"
class TopNav extends React.Component{
  constructor(){
    super();
  this.state = {
    isTyping:false
  }
  }
  componentWillMount(){
    
    
  }

  render(){
  const {currentCollection} = store.getState();

  // db
  // .collection(currentCollection.collection)
  // .where('type','==','typingping');
  // .query('time','asc')
  // .onSnapshot(e=>{
  //   const arr = e.docs.map(k=>k.data())
  //   console.log(arr);
  // })
  
  return (
    <div className="TopNav">
    <img onClick={e=>{
      if(window.innerWidth<660){
      const _t = document.querySelector("#left-wrapper");
      
      _t.style.display = (_t.style.display=="none"||_t.style.display=="")?"flex":"none"
      }
    }} style={{cursor:"pointer"}} className="navBtn" src={Icons.navBtn} alt={"NavBtn"}/>
    <div className={"ActiveUser"}>
    {currentCollection.user}
    <div className="isTyping"></div>
    </div>
   
    </div>
  )
  }
}

export default TopNav;