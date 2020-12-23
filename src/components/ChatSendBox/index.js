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
      db.collection(store.getState().currentCollection.collection)
      .add(chat).then(e=>{
        const _t = document.querySelector(".ChatBox")
        _t.scrollTo(0, _t.scrollHeight)
      });
      

    
      setMessage("");
  }

const setTyping = (condition) =>{
  const {allusers, user} = store.getState();
      const you = allusers.find(u=>u.name===user.name);
      db.collection("allusers").doc(you.id).update({...you, isTyping:condition})
}
  return <div className="ChatSendBox">
    <input
    onFocus={e=>{
      setTyping(true)
    }}

    onBlur={e=>{
      setTyping(false)
    }}
    
     onKeyDown={e=>{
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