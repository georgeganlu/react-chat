// 定义actions.
import { handleActions } from 'redux-actions'
import * as types from './reducers-types'
import state from './state'
import {Toast} from 'antd-mobile'
import axios from 'axios'
import { redirectUrl } from 'base/util'
import io from 'socket.io-client'
 
const socket = io('ws://192.168.12.51:4000');   //这里就直接是连接到后台去了。

let handleAc=handleActions({
    [types.setHome](state,{payload}){
        return {...state};
    },
    [types.setCity](state,{payload}){
        return {...state,userList:payload}
    },
    // 上面的两个actions是测试用的。下面是正式的actions。
    [types.setRegister](state,{payload}){
        let url=redirectUrl(payload);
        return {...state,...payload,redirect:url}; 
    },
    // 下面是登陆的actions。
    [types.setLogin](state,{payload}){
        let url=redirectUrl(payload);
        return {...state,...payload,redirect:url };
    },
    // 上面的登录和注册和下面要进行更新的，都可以用setCommon这个公共的actions来进行
    [types.setCommon](state,{payload}){
        let url=redirectUrl(payload);
        // 这里返回的这个新的state状态几乎包含了所有的信息。
        return {...state,...payload,redirect:url };
    },
    // 这个actions是当登陆或注册失败时的返回。
    [types.setError](state,{payload}){
        return {...state,...payload};
    },
    [types.setLogout](state,{payload}){
        // 清空的时候需要把 页面用于判断的user也清空，方法本身只清空了cookie。 这里清空msglist只是为了重定向时，不刷新当前的页面
        // 如果是不刷新当前页面的话
        return {userList:[],redirect:'/login',msgList:[]};  // 直接返回清空redux里面的数据。
    },
    // 这里是发送信息的reducers;
    [types.sendMsg](state,{payload}){
        // return {...state,...payload};
    },
    // 这里是接受信息的reducers.
    [types.recMsg](state,{payload}){  
        let {toReadId}=payload;
        let arr=payload.data.data.filter(v=>!v.read&&v.to===toReadId);
        // console.log(payload.data.data);
        return {...state,msgList:payload.data.data,unread:arr.length>0?arr.length:0};
    },
    // 下面的是未读的消息的list长度。一进入聊天的话，就需要有一个未读的列表。
    [types.msgList](state,{payload}){
        let {toReadId}=payload;
        let arr=payload.data.filter(v=>!v.read&&toReadId===v.to); // 查的话一次进来查所有的信息。。
        let usersList=payload.usersList;  // usersList是全部用户的列表。

    // 在倒退返回的时候contains页面又去请求了一次后台，通过reducers重新返回回去了。
        return {...state,msgList:payload.data,unread:arr.length>0?arr.length:0,usersList:usersList };
    },
    [types.updataRead](state,{payload}){
        let {toReadId,list}=payload;
        let arr=list.filter(v=>!v.read&&toReadId===v.to);
        return {...state,msgList:list,unread:arr.length>0?arr.length:0};
    }
},state);



// 接下来的actions是关于msg聊天信息方面的。

export function updataRead(payload){
    return (dispatch,getState)=>{     
        axios.post('/user/updataRead',payload).then(res=>{
            if(res.status===200&&res.data.code===0){
                let toReadId=getState().setCount._id; 
                let params={...payload,toReadId,num:res.data.num,list:res.data.data};
                dispatch(types.updataRead(params));
            }
        })
    }
}












// 接下来修正未读的信息，未读的话，有一个特点，就是别人发给我的才算未读。
// let from=this.props._id;  // 使用id来记录账户  // 这里的from是相对于来自我自己的。 
// let to=this.props.match.params.id;  // params是对方的内容。
// 也就是to才是给我的内容。

// 下面的actions都是关于chat聊天方面的内容。
export function sendMsg(payload){
    return dispatch=>{
        let {from,to,content}=payload;        
        socket.emit('sendmsg',{from,to,content});
    }
}
// 接受聊天的信息。
export function recevieMsg(){
    return (dispatch,getState)=>{
        // 这里是监听接受信息。
        socket.on('recevie',(data)=>{
            let toReadId=getState().setCount._id;
            dispatch(types.recMsg({data,toReadId}));
            // 为什么要执行两次监听。
        })
    }
}
export function _getMsgList(){
    // 这里是得到聊天内容的信息。
    return (dispatch,getState)=>{
        axios.get('/user/getmsg').then(res=>{
            if(res.status===200&&res.data.code===0){
                let toReadId=getState().setCount._id;  // 得到这里的状态，我是的人。
                let data=res.data.data;
                let usersList=res.data.usersList
                // 在取信息回来的时候把所有的id作为返回数据的key。
                dispatch(types.msgList({data,usersList,toReadId}));
            }
        })
    }
}



// 新来一个更新的 updata数据的请求。
export function updata(payload){
    return dispatch=>{
        axios.post('/user/updata',payload).then(res=>{
            if(res.status===200&&res.data.code===0){
                let obj=res.data.data;
                let params={...obj,...payload};
                dispatch(types.setCommon(params));
            } else {
                dispatch(types.setError(res.data));
            }
        })
    }
}

// 注册的actions。
export function setRegister(payload){
    // 注册时先作出一些判断。
    let { user,type,password,confirmPassWord}=payload;
    if (!user||!password||!type) {
            Toast.info('请填写对应的内容',2);            
            return false;
    }
    if (password!==confirmPassWord) {
        Toast.info('两次密码输入不一致',2);   
        return false;         
    }
    return (dispatch)=>{
        axios.post('/user/register',payload).then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(types.setCommon(payload));
                // 这里如果是注册成功的话，相应的就应该路转到对应的路由中去。
            }else{
                dispatch(types.setError(res.data));
            }
        })
    }
}
// 登陆的actions.
export function setLogin(payload){
    return dispatch=>{
        axios.post('/user/login',payload).then(res=>{
            // 这里其实要分成两步，一步是用户名存在登陆成功，一步是用户名不存在，请注册。            
            if(res.status===200&&res.data.code===0){
                dispatch(types.setCommon(res.data.data));
            }else{
                dispatch(types.setError(res.data));
            }
        })
    }
}
// 登陆后把返回的数据加载到redux中去。
export function loadData(payload){
    // 当每次刷新的时候把登陆过的id信息返回来后，在通过actions注入的redux中去，让别的页面也可以取到是这个用户的数据。
    return dispatch=>{
        dispatch(types.setCommon(payload));
    }
}
// 得到对应显示列表的数据。
export function getListData(payload){
    return (dispatch)=>{        
        axios.get(`/user/list?type=${payload}`).then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(types.setCity(res.data.data));       
            }else{
                dispatch(types.setError(res.data));
            }
            
        })
    }
}
//  退出时支除cookie的内容。
export function logout(){
    return dispatch=>{
        dispatch(types.setLogout());
    }
}


export default handleAc;


