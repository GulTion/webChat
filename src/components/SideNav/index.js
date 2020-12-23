import React from "react";
import _ from "../../actions/"
import {db} from '../../service/'
import './index.css';
import store from "../../store.js"

class SideNav extends React.Component{
  constructor(){
    super();
    this.state = {
      allusers:[]
    }
  }


  componentWillMount(){

    db.collection('allusers')
    .get()
    .then(e=>{
      this.setState({
        allusers:e.docs.map(k=>k.data())
      });
    });

    db.collection('allusers')
    .onSnapshot(e=>{
      this.setState({
        allusers:e.docs.map(k=>{return {...k.data(),id:k.id}})
      });
      store.dispatch({type:"ADD_ALL_USERS",data:e.docs.map(k=>{return {...k.data(),id:k.id}})});

    })




  }


  readyForChat=(obj)=>{
    const collection = [obj.from, obj.to].sort().join(":");
    
    db.collection(collection).add({message:"",time:new Date().toJSON()}).then(e=>{

      store.dispatch({type:"ADD_CURRENT_COLLECTION", data:{collection:collection,user:obj.to}})
    });

    db.collection(collection).orderBy("time",'asc')
      .onSnapshot(e=>{
        const arr=e.docs.map(k=>{
        if(k.data().message!=""){
            const t =  k.data()
            if(t.from==store.getState().user.name){
            t["you"] = true;
          }else{
            t["you"] = false;
          }

      return t;
        }
      
        }
        );
         store.dispatch({type:"ADD_CHAT_LIST",data:arr});
         
        })




  }
  render(){
    
    const {allusers} = this.state;
    const {user} = store.getState();
  return (
    <>
    <div className="SideNav">{allusers.map((e,i)=>{
      if(user.name==e.name)
        return;
      return <div onClick={e=>{
        this.readyForChat(
          {
            from:store.getState().user.name, 
            to:store.getState().allusers[i].name})
            }} className="user" key={i}>
            <div className="Name">{e.name}</div>
            <div className="isTyping">{e.isTyping?"Typing ...":""}</div>
            </div>
    })}
    </div></>
  )
  }
}

export default SideNav;