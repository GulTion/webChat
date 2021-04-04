import {db} from '../../service/'
import _ from "../../actions/"
import store from "../../store.js"
const {log,table} = console

const getListOfUser = () =>{
    const user = store.getState();
    // log(user.user)
    db.collection("users").where("name","!=", user.user.name)
    .get().then(snapShots=>{
        let all_list = snapShots.docs.map(docs=>docs.data()).sort((a)=>!a.isOnline);
        store.dispatch({type:_.GET_LIST_OF_ALL_USERS, data:all_list})
        table(all_list);
    }).catch(err=>{
        log({err})
    })
}

const setToOnline = (isOnline) =>{
    const user = store.getState().user;
    db.collection("users").doc(user.email).update({
        isOnline
    }).then(res=>{
        
        db.collection('users').onSnapshot(e=>{
            getListOfUser();
            log(`${user.name} is ${isOnline?"ONLINE":"OFFLINE"} !`);
        })
    }).catch(err=>{
        log({fromSetToOnline:err})
    })
}

const detectionForActivity = () =>{

    var browserPrefixes = ['moz', 'ms', 'o', 'webkit'];
    function getHiddenPropertyName(prefix) {
        return (prefix ? prefix + 'Hidden' : 'hidden');
      }
    
    function getVisibilityEvent(prefix) {
        return (prefix ? prefix : '') + 'visibilitychange';
      }
    
    function getBrowserPrefix() {
        for (var i = 0; i < browserPrefixes.length; i++) {
          if(getHiddenPropertyName(browserPrefixes[i]) in document) {
            // return vendor prefix
            return browserPrefixes[i];
          }
        }
        return null;
    }

    var browserPrefix = getBrowserPrefix();

    function handleVisibilityChange() {

        if(document[getHiddenPropertyName(browserPrefix )]) {
          // the page is hidden
          setToOnline(false);
          log('OFFLINE')
        } else {
          // the page is visible
            setToOnline(true);
            log('ONLINE')
        }
      }

      document.addEventListener(getVisibilityEvent(browserPrefix), handleVisibilityChange, false);
      
     window.addEventListener("beforeunload", function(e){
        setToOnline(false);
     }, false);
}

const setDBForChat = (withUser) =>{
  const user = store.getState().user;
  user.chatWith = withUser;
  user.chatDB = [user.name, user.chatWith].sort().join(":");
  log(user)
  store.dispatch({type:"SET_USER",data:user});
  db.collection(user.chatDB).add({
    time:new Date().toJSON(),
    type:"init",
    message:"",
    from:user.name,
    to:user.chatWith
  }).then(info=>{
    console.log({fromSetDBFromChat:info});
    loadChatList();
  }).catch(err=>{
    console.log({fromSetDBFromChat:err})
  })
  
  
  // db.collection(user.chatDB).add()
}

const loadChatList = () =>{
  const {user} = store.getState();
  db.collection(user.chatDB).where('type','==','chat').get().then(shots=>{
    let sortedChat = shots.docs.map(e=>e.data()).sort((a,b)=>{return a.time>b.time})
    store.dispatch({type:'ADD_CHAT_LIST', data:sortedChat})
  });

  db.collection(user.chatDB).where('type','==','chat').onSnapshot(shot=>{
    let sortedChat = shot.docs.map(e=>e.data()).sort((a,b)=>{return a.time>b.time})
    store.dispatch({type:'ADD_CHAT_LIST', data:sortedChat})
  })
}


export {getListOfUser,setToOnline,detectionForActivity, setDBForChat};