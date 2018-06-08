import { createActions } from 'redux-actions'
// 定义actions.
import { handleActions } from 'redux-actions'

let state={
    meAvatar:'',
    avatar:'',
    name:''
};
const {setChat}=createActions({},'SET-CHAT');

let handleChat=handleActions({
    [setChat](state,{payload}){
        return {...state};
    },
},state);

export function pushChat(payload){
    return dispatch=>{
        console.log(payload);
        dispatch(setChat(payload));
    }
}
export default handleChat;