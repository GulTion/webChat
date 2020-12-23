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
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component{
  constructor(){
    super();
    this.state={
      chatList:[
        {message:"You hare Chat Box",time:new Date().toJSON()}
      ],
     
    };
  };
  componentDidMount(){
    const {store} = this.props;
    store.subscribe(()=>{this.forceUpdate();
    const _t = document.querySelector(".ChatBox")
        _t.scrollTo(0, _t.scrollHeight+100);
    });
     const _key = localStorage.getItem("dont_share_with_anybody");
    if(_key){
      db
        .collection('users')
        .where("key","==",_key)
        .onSnapshot(snap=>{
         if(snap.docs.length==0){
           window.location.pathname = "/auth";
           
         }else{
    
            store.dispatch({type:_.CHECK_AUTH,data:snap.docs[0].data()});

         }
        });
        
    }else{
      window.location.pathname = "/auth";
    }  

    ;
    
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
   { !store.getState().currentCollection.user==""?<ChatBox chatList={chatList}/>:<div className="ChatBox"><div className="Unknown">
    <img src={Icons.logo} alt={"logo"} />
    <h2>Welcome to WebChat</h2>
   </div></div>}
    <ChatSendBox onSend={(chat)=>{
      this.setState({chatList:[...chatList, chat]});
      const chatbox = document.querySelector(".ChatBox");
      chatbox.scrollTo(0, chatbox.scrollHeight);
    }}/>

    </div>
    </div>
    </div>
  )}
}

export default App;
