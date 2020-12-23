import React,{useState} from "react";

import './index.css';
import Icons from '../Icons/';
import store from "../../store.js"
import {db} from '../../service/'


const ChatSendBox = (props)=>{
  const [message, setMessage] = useState("");
  const {onSend} = props;
  const [you,setYou] = useState(false)
  const sendMessage=(chat)=>{
    if(message=="")
      return;
      console.log(chat);
      db.collection(store.getState().currentCollection.collection)
      .add(chat);
      
    

      
      setMessage("");
  }
  return <div className="ChatSendBox">
    <input onKeyDown={e=>{
      if(e.key=='Enter'){
         sendMessage({
        message,time:new Date().toJSON(),from:store.getState().user.name, 
       to:store.getState().currentCollection.user
        });
         setYou(!you)
      }
    }} value={message} onChange={(e)=>setMessage(e.target.value)} className="ChatInput"/>
    <img onClick={()=>{
      sendMessage({
        message,time:new Date().toJSON(),from:store.getState().user.name, 
       to:store.getState().currentCollection.user
        });

    }} className="SendBtn" src={Icons.sendBtn} alt={"Send Button"}/>
  </div>
}

export default ChatSendBox;