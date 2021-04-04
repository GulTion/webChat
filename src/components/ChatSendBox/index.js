import React,{useState} from "react";

import './index.css';
import Icons from '../Icons/';
import store from "../../store.js"
import {db} from '../../service/'



class Obj{
  val = false;
  change(v){
    if(this.val==v){
      return;
    }else{

      const {currentCollection, user} = store.getState();
      db
      .collection(currentCollection.collection)
      .add({from:user.name,to:currentCollection.user,type:"typingping", isTyping:v,time:new Date().getTime()})

      this.val = v
    }
  }
}

const obj = new Obj();


const ChatSendBox = (props)=>{
  const [message, setMessage] = useState("");
  const {onSend} = props;
  const [you,setYou] = useState(false)

  
  const callServerScript=()=>{
      
      obj.change(false)
}



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

  

  return <div className="ChatSendBox">
    <input
    onFocus={e=>{
      var searchTimeout;
      e.target.onkeypress=function(){
         if (searchTimeout != undefined) clearTimeout(searchTimeout);
      searchTimeout = setTimeout(callServerScript, 1000);
      };
    }}

     onKeyDown={e=>{
      // if(e.key=='Enter'){
      //    sendMessage({
      //   message,time:new Date().toJSON(),from:store.getState().user.name, 
      //  to:store.getState().currentCollection.user
      //   });
      //    setYou(!you)
      // }
      obj.change(true)
    }} 
    
    value={message} 
    onChange={(e)=>setMessage(e.target.value)} className="ChatInput" />
    <img onClick={()=>{
      sendMessage({
        message,time:new Date().toJSON(),
        from:store.getState().user.name, 
        to:store.getState().currentCollection.user,
        type:"chat"
        });

    }} className="SendBtn" src={Icons.sendBtn} alt={"Send Button"}/>
  </div>
}

export default ChatSendBox;