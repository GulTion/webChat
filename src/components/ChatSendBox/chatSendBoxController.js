import store from "../../store.js"
import {db} from '../../service/'

const {table,log} = console;
const sendMessage = ({message},action)=>{
    const user = store.getState().user;
    if(message==="")
        return;
    else{
        db.collection(user.chatDB).add({
            type:"chat",
            message,
            time:new Date().toJSON(),
            from:user.name,
            to:user.chatWith
        }).then(docs=>{
            action();
            log({fromSendMessage:`${message} is sended to ${user.chatWith}`});
            const _t = document.querySelector(".ChatBox")
            _t.scrollTo(0, _t.scrollHeight);
            

        }).catch(err=>{
            log({fromSendMessage:err});
        });
    }
}

export {sendMessage}