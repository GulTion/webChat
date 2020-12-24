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


  componentDidMount(){
    const {allusers} = store.getState();
    db.collection('allusers')
    .get()
    .then(e=>{
      store.dispatch({type:"ADD_ALL_USERS",data:e.docs.map(k=>{return {...k.data(),id:k.id}})});

    const users = store.getState().user;

    const you = store.getState().allusers.find(k=>k.name==users.name);
     db.collection('allusers').doc(you.id).update({...you, isOnline:true});
      store.dispatch({type:"ADD_ID_OF_USER",data:{...you, isOnline:true}});

//     function handleVisibilityChange() {
//   if(document.hidden) {
      
//   } else {

//   }
// }

// document.addEventListener("visibilitychange", handleVisibilityChange, false);
    

     var browserPrefixes = ['moz', 'ms', 'o', 'webkit'];

// get the correct attribute name
function getHiddenPropertyName(prefix) {
  return (prefix ? prefix + 'Hidden' : 'hidden');
}

// get the correct event name
function getVisibilityEvent(prefix) {
  return (prefix ? prefix : '') + 'visibilitychange';
}

// get current browser vendor prefix
function getBrowserPrefix() {
  for (var i = 0; i < browserPrefixes.length; i++) {
    if(getHiddenPropertyName(browserPrefixes[i]) in document) {
      // return vendor prefix
      return browserPrefixes[i];
    }
  }

  // no vendor prefix needed
  return null;
}

// bind and handle events
var browserPrefix = getBrowserPrefix();

function handleVisibilityChange() {
  if(document[getHiddenPropertyName(browserPrefix )]) {
    // the page is hidden
    db.collection('allusers').doc(you.id).update({...you, isOnline:false});
      store.dispatch({type:"ADD_ID_OF_USER",data:{...you, isOnline:false}});
  } else {
    // the page is visible
          db.collection('allusers').doc(you.id).update({...you, isOnline:true}).then(e=>{
            console.log(you.id);
          });
      store.dispatch({type:"ADD_ID_OF_USER",data:{...you, isOnline:true}});
  }
}

document.addEventListener(getVisibilityEvent(browserPrefix), handleVisibilityChange, false);

    });
    
   
    

    db.collection('allusers')
    .onSnapshot(e=>{

      store.dispatch({type:"ADD_ALL_USERS",data:e.docs.map(k=>
      {
        return {...k.data(),id:k.id}
      
      })
        });

      //Now Add server userID for ONLINE purpose or custom   
    });




  }


  readyForChat=(obj)=>{
    const collection = [obj.from, obj.to].sort().join(":");
    
    db.collection(collection).add({
      time:new Date().toJSON(),
      type:"readyping",
      message:"",
      from:store.getState().user.name
      }).then(e=>{

      store.dispatch({type:"ADD_CURRENT_COLLECTION", data:{collection:collection,user:obj.to}})
    });

    db.collection(collection).orderBy("time",'asc')
      .onSnapshot(e=>{
        const arr=e.docs.map(k=>{
        if(k.data().type="readyping"&&k.data().message!=""){
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
    
 
    const {user, allusers} = store.getState();
  return (
    <>
    <div className="SideNav">{allusers.map((e,i)=>{
      if(user.name==e.name)
        return;
      return <div 
              onClick={e=>{
        this.readyForChat({
            from:store.getState().user.name, 
            to:store.getState().allusers[i].name
          })
            }} 
            
              className="user" key={i}>

            <div className="Name">{e.name}</div>
            <div className={e.isOnline?"isOnline":"isOffline"}></div>
            
            </div>
    })}
    </div></>
  )
  }
}

export default SideNav;