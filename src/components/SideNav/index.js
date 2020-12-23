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
      console.log(store.getState())
    });

    db.collection('allusers')
    .onSnapshot(e=>{
      this.setState({
        allusers:e.docs.map(k=>k.data())
      });
      store.dispatch({type:"ADD_ALL_USERS",data:e.docs.map(k=>k.data())})
      console.log(store.getState())
    })

  }


  readyForChat=(obj)=>{
    const collection = [obj.from, obj.to].sort().join(":");
    
    db.collection(collection).add({message:"",time:new Date().toJSON()}).then(e=>{
      console.log(store.getState());
      store.dispatch({type:"ADD_CURRENT_COLLECTION", data:{collection:collection,user:obj.to}})
    });



  }
  render(){
    
    const {allusers} = this.state;
  return (
    <div className="SideNav">{allusers.map((e,i)=>{
      return <div onClick={e=>{
        this.readyForChat(
          {
            from:store.getState().user.name, 
            to:store.getState().allusers[i].name})
            }} className="user" key={i}>{e.name}</div>
    })}
    </div>
  )
  }
}

export default SideNav;