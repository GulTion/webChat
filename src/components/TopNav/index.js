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
    const {user} = store.getState();
    db
    .collection(user.chatDB||"abc")
    .doc(user.chatWith+"_isTyping")
    .onSnapshot(sho=>{
      console.log(sho)
      // this.setState({isTyping:sho.data().isTyping})
    })
    
  }

  render(){
  const {user} = store.getState();


  
  return (
    <div className="TopNav">
    <img onClick={e=>{
      if(window.innerWidth<660){
      const _t = document.querySelector("#left-wrapper");
      
      _t.style.display = (_t.style.display=="none"||_t.style.display=="")?"flex":"none";
      }else{
        const _t = document.querySelector("#left-wrapper");
      
      _t.style.display = (_t.style.display=="none"||_t.style.display=="")?"flex":"none";
      }
    }} style={{cursor:"pointer"}} className="navBtn" src={Icons.navBtn} alt={"NavBtn"}/>
    <div className={"ActiveUser"}>
    {user.chatWith}
    <div className="isTyping">{!this.state.isTyping?"":"isTyping.."}</div>
    </div>
   
    </div>
  )
  }
}

export default TopNav;