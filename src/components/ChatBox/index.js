import React,{useState} from "react";

import Chat from "../Chat/"
import "./index.css"
import store from "../../store.js"
import {db} from '../../service/'

class ChatBox extends React.Component{
  constructor(){
    super();
    this.state={chatList:[{}]}
  }
  
  render(){
    const {chatList} = store.getState();
  return (<div className="ChatBox">
      {chatList.map((chat, index)=>{
        return <Chat key={index} chat={chat}/>
      })}
  </div>)
}

}
export default ChatBox;
