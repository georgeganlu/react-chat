import React,{Component} from 'react'
import { List,Badge } from 'antd-mobile'
import {connect} from 'react-redux'
import { recevieMsg,_getMsgList } from 'store/reducers'

const Item = List.Item;
const Brief = Item.Brief;

@connect(
    state=>state.setCount,
    { recevieMsg, _getMsgList}
)
class Msg extends Component{
    componentDidMount(){
        //  msg这个list就是contains这个组件下面，其实已经运行了
    }
    render(){
        const loginId=this.props._id;
        const usersList=this.props.usersList;
        // 先对和我相关的聊天信息进行处理。--这里由于存的时候有一个前提就是
        // 不管 我发起的聊天，还是别人对我发起的聊天，chatId的值都是一样的。
        let msgObj={};
        // 666666666666的写法。提取出相同的chatid分成同一个组。
        let arrList=this.props.msgList.filter(v=>v.from===loginId||v.to===loginId);
        // 在这里进行一下进滤和我相关的数据才出现在list表中。
        arrList.forEach(el => {
            msgObj[el.chatId]=msgObj[el.chatId]||[];  // 存在的话就把这个推到一个新的数组中。
            msgObj[el.chatId].push(el);
        });
        // Object.values只提取了值。
        let arrData=Object.values(msgObj);
        // arrData.forEach(el=>{
        //     el.sort((a,b)=>{
        //         b.createTime-a.createTime;
        //     })
        // }) 
        const msgChat=arrData.sort((a,b)=>{
            return b[b.length-1].createTime - a[a.length-1].createTime;
        });
        // 上面msgChat经过sort时间的排序，把最大的放在最后一个。
        // 接下来是未读信息的条数，头像和name。这个其实也已经在usersList中了。
        // 还有一个是聊天的排序，谁给你发的，就要排在上面。
        if(!msgChat.length){
            return false;
        }
        return (
            <div>
                {
                    msgChat.length?msgChat.map((v,index)=>{
                        // 上面拿到了现在登录用户的id，聊天对话的list现在
                        const targetId=loginId===v[v.length-1].from?v[v.length-1].to:v[v.length-1].from;
                        // 这里拿到聊天对话，对方的id;
                        const avatar=require(`assets/imgs/${usersList[targetId].avatar}.png`);
                        // 现在要显示未读信息的数量。套路其实也是一样的。先拿到第一层的数据v。
                        const unread=v.filter(item=>!item.read&&item.to===loginId).length;  //666666的写法。
                    return <List  key={index}  >                    
                            <Item
                              arrow="horizontal"
                              thumb={avatar}
                              multipleLine
                              extra={<Badge text={unread} />}
                              onClick={() => {
                                // 这里点击要进入具体的页面其实就是与name和头像绑定的目标对象的id;
                                  this.props.history.push(`/chat/${targetId}`);
                              }}
                            >
                               {usersList[targetId].name} <Brief>{v[v.length-1].content}</Brief>
                            </Item>
                        </List>                        
                    }):null
                }
            </div>
        )
    }
}
export default Msg;