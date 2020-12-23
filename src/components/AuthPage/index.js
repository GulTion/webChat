import React,{useState} from 'react'
import "./index.css"
import {db} from "../../service/"


const Login=() =>{
  const [alert,setAlert] = useState("");


  const loginToMe=(cred)=>{
    if(cred.password==""&&cred.name==""){
        setAlert("Empty Password and UserName !")
    }else{  
      setAlert("")
    db
    .collection("users")
    .where("name","==",cred.name.toLowerCase())
    .where("password","==",cred.password)
    .onSnapshot(snap=>{
        if(snap.docs.length===0){
          setAlert("Wrong Password or UserName !");
        }else{
         
            
            localStorage.setItem('dont_share_with_anybody',snap.docs[0].data().key);
            window.location.pathname = "/";
        }
    })}
  }

  const [data,setData] = useState({name:"",password:""})
  return <div className="Page">
    <input onBlur={e=>setData({...data,name:e.target.value})} placeholder="User Name" type="text"/>
    <input onBlur={e=>setData({...data,password:e.target.value})} placeholder="Password" type="password"/>
    <Alert alert={alert}/>
    <input onClick={()=>{loginToMe(data)}} value="LOGIN" type="button"/>
  </div>
}

const Signup =() =>{
  const [data,setData] = useState({name:"",password:""})
  const [alert,setAlert] = useState("");
  const [isTaken, setTaken] = useState(true);
  const checkUser = (name)=>{
    
          db
          .collection('users')
          .where('name','==',name)
          .onSnapshot(snap=>{
            if(snap.docs.length==0){
              setTaken(false);
              setAlert("");
            }else{
              setAlert("Username is already taken !");
            }
          })
  }

  const signupToMe =(cred)=>{

      const _key = btoa(JSON.stringify({...cred,key:new Date().getTime().toString(36)}));
      cred["key"] = _key;
      cred["name"] = cred.name.toLowerCase();
        if(cred.password==""&&cred.name==""&&cred.email==""&&!isTaken){
            setAlert("Empty Password , UserName & Email !");
        }else{  
              db
              .collection('users')
              .add(cred)
              .then(e=>{
                localStorage.setItem('dont_share_with_anybody',cred.key);
                window.location.pathname = "/";
                
                db.collection('allusers').add({name:cred.name,isOnline:false, isTyping:false,}).then(e=>{

                })
              })
        }
  }



   return <div className="Page">
    <input 
    onBlur={e=>{setData({...data,name:e.target.value});checkUser(e.target.value.toLowerCase())}}  placeholder="User Name" type="text"/>
    <input 
    onBlur={e=>{setData({...data,password:e.target.value});}}  placeholder="Password" type="password"/>
    <input onBlur={e=>setData({...data,email:e.target.value})}  placeholder="Email" type="email" />
    <Alert alert={alert}/>
    <input onClick={()=>{signupToMe(data)}} value="SIGNUP" type="button"/>
  </div>
}

const Alert = (props)=>{
  return <div className="Alert">{props.alert}</div>
}

const AuthPage = (props) =>{
  const [tab,setTab] = useState(0);
 
  const authPages = {
    0:<Login />,
    1:<Signup />
  }


  return(
    <div className="AuthPage-wrapper">
      <div className="AuthPage">
      <div className="Tabs">
        <div onClick={e=>setTab(0)} className={tab===0?"Tab TabActive":"Tab"}>{"Log In"}</div>
        <div onClick={e=>setTab(1)} className={tab===1?"Tab TabActive":"Tab"}>{"Sign Up"}</div>
      </div>
      {authPages[tab]}


      </div>
    </div>
  )
}

export default AuthPage;