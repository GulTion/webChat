import React,{useState} from "react";

import './index.css';
import Icons from '../Icons/';
import store from "../../store.js"
import {db} from '../../service/'
import {sendMessage} from "./chatSendBoxController"







const ChatSendBox = (props)=>{
  const [message, setMessage] = useState("");


  return <div className="ChatSendBox">
    <input
    value={message} 
    onChange={(e)=>setMessage(e.target.value)} 
    className="ChatInput" />
    <img onClick={()=>{
      sendMessage({
        message
        },e=>{setMessage("")});

    }} className="SendBtn" src={Icons.sendBtn} alt={"Send Button"}/>
  </div>
}

export default ChatSendBox;