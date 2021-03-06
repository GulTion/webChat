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
      {chatList.sort((a,b)=>b.isOnline).map((chat, index)=>{
        if(chat!=undefined&&chat.type!="readyping"&&chat.message!="")
        return <Chat chat={chat}/>
      })}
  </div>)
}

}
export default ChatBox;
