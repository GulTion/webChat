import React from "react";
import _ from "../../actions/"
import {db} from '../../service/'
import './index.css';
import store from "../../store.js"
import {
  getListOfUser, setToOnline,
  detectionForActivity,setDBForChat} from "./controller";

class SideNav extends React.Component{
  constructor(){
    super();
    this.state = {
      allusers:[]
    }
  }


  componentDidMount(){
    // Load all memeber to state.allusers

    getListOfUser();
    setToOnline(true);
    detectionForActivity();

  }


  // readyForChat=(obj)=>{
  //   const collection = [obj.from, obj.to].sort().join(":");
    
    // db.collection(collection).add({
    //   time:new Date().toJSON(),
    //   type:"readyping",
    //   message:"",
    //   from:store.getState().user.name
    //   }).then(e=>{

    //   store.dispatch({type:"ADD_CURRENT_COLLECTION", data:{collection:collection,user:obj.to}})
    // });

    // db.collection(collection).orderBy("time",'asc')
    //   .onSnapshot(e=>{
    //     const arr=e.docs.map(k=>{
    //     if(k.data().type="readyping"&&k.data().message!=""){
    //         const t =  k.data()
    //         if(t.from==store.getState().user.name){
    //         t["you"] = true;
    //       }else{
    //         t["you"] = false;
    //       }

    //   return t;
    //     }
      
    //     }
    //     );
    //      store.dispatch({type:"ADD_CHAT_LIST",data:arr});
         
    //     })





  // }

  render(){
    
 
    const {user, allusers} = store.getState();
  return (
    <>
    <div className="SideNav">{allusers.map((e,i)=>{

      return <div className="user" key={i} onClick={evt=>setDBForChat(e.name)}>

            <div className="Name">{e.name}</div>
            <div className={e.isOnline?"isOnline":"isOffline"}></div>
            
            </div>
    })}
    </div></>
  )
  }
}

export default SideNav;