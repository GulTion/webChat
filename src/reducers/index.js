import _ from "../actions/"
import {auth} from "../service/"
import {combineReducers} from "redux";
import {db} from "../service/"


const initState={
  allusers:[],
  user:{name:"gultion", mail:"gkv8192@gmail.com"},
  currentCollection:{user:"",collection:"j"},
  chatList:[],
  isAuth:false
}
export default function reducer(state=initState, action){
  //CHECK_AUTH
  const {type, data} = action
  if(type===_.CHECK_AUTH){
    return {...state, user:data};
  }

  else if(type==_.ADD_ALL_USERS){
    return {...state, allusers:data.sort((a,b)=>b.isOnline)};
  }

  else if(type=="ADD_CURRENT_COLLECTION"){
    return {...state, currentCollection:data}
  }

  else if(type=="ADD_CHAT_LIST"){
    return {...state, chatList:data}
  }


  else if(type=="AUTH"){
    return {...state, isAuth:data.isAuth, user:data.user}
  }

  else if(type===_.GET_LIST_OF_ALL_USERS){
    return {...state, allusers:data};
  }
  else if(type==="SET_USER"){
    return {...state, user:data}
  }




  return state;
}

