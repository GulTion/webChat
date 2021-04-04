import React,{useState,useEffect} from "react";

import './index.css';
import Icons from '../Icons/';
import store from "../../store.js"
import {db} from '../../service/'
import {sendMessage,setTyping,detectionForTyping} from "./chatSendBoxController"







const ChatSendBox = (props)=>{
  const [message, setMessage] = useState("");
  useEffect(()=>{
    detectionForTyping();
  })
  
  return <div className="ChatSendBox">
    <input
    value={message} 
    onChange={(e)=>setMessage(e.target.value)} 
    className="ChatInput"
    onFocus={e=>setTyping(true)}
    onBlur={e=>setTyping(false)}
    id="ChatInput" />
    <img onClick={()=>{
      sendMessage({
        message
        },e=>{setMessage("")});
        setTyping(false);

    }} className="SendBtn" src={Icons.sendBtn} alt={"Send Button"}/>
  </div>
}

export default ChatSendBox;