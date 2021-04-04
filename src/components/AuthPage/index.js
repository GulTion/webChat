import React,{useState} from 'react'
import "./index.css"
import {db,firebase} from "../../service/"
import {signupToUser,isUserExist, signinToUser} from "./controller";

const {log,table}=  console;

const Login=() =>{
  const [alert,setAlert] = useState("");
  const [isPasswordHidden ,setToHiddenPassword] = useState(true);

  const [data,setData] = useState({email:"",password:""})

  return <form className="Page"  onSubmit={
     e=>{
       e.preventDefault();
       log(data);
       signinToUser(data,(cb)=>{
         if(cb.type=="error"){
           setAlert(cb.error.message);
         }
       });
     }
   }>
    <input onBlur={e=>setData({...data,email:e.target.value})} placeholder="Email" type="email"
    required={true}
    />
    <div className="flex-row">

    <input 
    onBlur={e=>{setData({...data,password:e.target.value})}}  placeholder="Password" 
    required={true}
    
    type={isPasswordHidden?"password":"text"}/>

    <div className="passwordShower" onClick={()=>setToHiddenPassword(!isPasswordHidden)}>{!isPasswordHidden?"hide":"show"}</div>
    </div>
    
    <Alert alert={alert}/>
    <input type="submit" value="LOGIN"/>
  </form>
}

const Signup =() =>{
  const [data,setData] = useState({name:"",password:"",email:""})
  const [alert,setAlert] = useState("");
  const [isTaken, setTaken] = useState(true);
  const [isPasswordHidden ,setToHiddenPassword] = useState(true);



   return <form className="Page" onSubmit={
     e=>{
       e.preventDefault();
       signupToUser(data,(dataFromCreatedUser)=>{
          log({dataFromCreatedUser});

          if(dataFromCreatedUser.type==="error"){
            setAlert(dataFromCreatedUser.err.message);
          }
          if(dataFromCreatedUser.type==="ok"){
             localStorage.setItem("dont_share_with_anybody",dataFromCreatedUser.user.user.refreshToken)
             setAlert("")
          }
       });
     }
   }>

    <input 
    onBlur={async e=>{
      setData({...data,name:e.target.value});
       isUserExist(e.target.value.toLowerCase(),doc=>{
         log(doc)
         setAlert(!doc?"":`User is Already Exist !`)
       })
      }}
    required={true}
    placeholder="User Name" 
    type="text"
    min={5}

    />
    <div className="flex-row">

    <input 
    onBlur={e=>{setData({...data,password:e.target.value});}}  placeholder="Password" 
    required={true}
    min={8}
    type={isPasswordHidden?"password":"text"}/>

    <div className="passwordShower" onClick={()=>setToHiddenPassword(!isPasswordHidden)}>{!isPasswordHidden?"hide":"show"}</div>
    </div>

    <input 
    onBlur={e=>setData({...data,email:e.target.value})}  placeholder="Email" 
    type="email" 
    required={true}
    />
    <Alert alert={alert}/>
    <input value="SIGNUP" type="submit" />
  </form>
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