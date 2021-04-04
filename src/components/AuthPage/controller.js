import {firebase,db} from "../../service/";
import store from "./../../store"


const signupToUser = ({name,email, password}, callback)=>{
  isUserExist(email, isExist=>{
    if(!isExist){
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user=>{
          db.collection("users").doc(email).set({name,uid:user.user.uid,email:email}).then(
            k=>{
              store.dispatch({type:"AUTH", data:{isAuth:true,user:{name,uid:user.user.uid,email:email}}});
              callback({type:"ok",user, userDB:k})
            }
          )
          // callback({type:"ok",user})
          })
        .catch(err=>callback({type:"error",err}));
    }
  })
  
  

}

const isUserExist = (name,cb) =>{
  db
    .collection("users")
    .where("name","==",name).get()
    .then(doc=>{
      const query=doc.docs.length==0?{name:""}:doc.docs[0].data()
    
       console.log({
        FromisUserExistInCollector:query
      })
      cb(query.name===name)
    }).catch(err=>{
      console.log({
        FromisUserExistInCollector:err
      })
      cb({err});
    })
}

const signinToUser = ({email, password},cb)=>{
  
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log({signinToUser:userCredential});
    
    db.collection("users").doc(email).get().then(e=>{
      // store.dispatch({type:"ADD_ID_OF_USER", data:e.data()});
      store.dispatch({type:"AUTH", data:{user:e.data(), isAuth:true}});
    })
    cb({type:"ok",userCredential})
    // ...
  })
  .catch((error) => {
    console.log({signinToUser:error})
    cb({type:"error",error})
  });
}

export {signupToUser,isUserExist,signinToUser}