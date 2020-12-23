import React from "react";

import "./index.css"

const Chat = (props)=>{
  const {message, time, you} = props.chat;
  
  const _time =  new Date(time)
  const [hours, minute, day] = [_time.getHours(),_time.getMinutes()]
  return <div style={{justifyContent:you&&"end"}}className="Chat-wrapper"><div className="Chat" style={{background:you&&"white"}}>
    <div className="message">{message}</div>
    <div className="details">
      <div className="time">{hours+":"+minute}</div>
      <div className="status">{}</div>
    </div></div>
  </div>
}

export default Chat;
