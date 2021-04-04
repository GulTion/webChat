import React from 'react';
import _ from "./actions"

import './App.css';
import ChatSendBox from "./components/ChatSendBox/"
import ChatBox from "./components/ChatBox/"
import TopNav from "./components/TopNav"
import SideNav from "./components/SideNav/"
import Icons from "./components/Icons/"

import {db} from "./service"
import store from "./store.js"
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component{
  constructor(){
    super();
    this.state={
      chatList:[
        {message:"You hare Chat Box",time:new Date().toJSON()}
      ],
     
    };
  };



  componentWillMount(){
    // take store Object 
    const {store} = this.props;

    // for Scrolling ti Chatbox if any message is in there when store is change
    store.subscribe(()=>{this.forceUpdate();
    const _t = document.querySelector(".ChatBox")
        _t.scrollTo(0, _t.scrollHeight+100);
    });

  
    
  }

  render(){ 
    const {chatList} = this.state
    return (
    <div className="App-wrapper">
      <div className="App">
        <div id={"left-wrapper"} className="Left-wrapper">
        <TopNav />
          <SideNav store={this.props.store}/>
        </div>

        <div className="Right-wrapper">

        <TopNav />

        {
          !store.getState().user.chatWith==""?
            <ChatBox chatList={chatList}/>:
            <div className="ChatBox">
              <div className="Unknown">
                <img src={Icons.logo} alt={"logo"} />
                  <h2>Welcome to WebChat</h2>
              </div>
            </div>
          }

        
   
          <ChatSendBox 
              onSend={(chat)=>
                {
                  this.setState({chatList:[...chatList, chat]});
                  const chatbox = document.querySelector(".ChatBox");
                  chatbox.scrollTo(0, chatbox.scrollHeight);
                  }
                }
            />

    </div>
    </div>
    </div>
  )}
}

export default App;
