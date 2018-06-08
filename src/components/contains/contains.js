import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Switch,Route } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import Genius from 'components/genius-info/genius'
import Boss from 'components/boss-info/boss'
import FooterCommon from './footerCommon'
import User from 'components/user-center/user'
import { recevieMsg,_getMsgList } from 'store/reducers'
import Msg from 'components/chat-msg/list'


@connect(
    state=>state.setCount,
    { recevieMsg,_getMsgList }
)
class Contains extends Component{
    componentDidMount(){
        // 当这个组件加载完成后，先进行信息的拉取。 
        if(!this.props.msgList.length){
            this.props._getMsgList();  // 在公共组件中运行了这个
           // 在进行信息的接收监听。
            this.props.recevieMsg();     
        }            
    }
    render(){
        // 要渲染一个公共的头部和底部的组件。
        let {pathname}=this.props.location;
        const user=this.props.type;
        let navList=[
            {
                path:'/boss',  // 如果身份是boss的话，要看的列表肯定就是牛人了。
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user==='NB'
            },
            {
                path:'/genius',  // 如果身份是boss的话，要看的列表肯定就是牛人了。
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Genius,
                hide:user==='BOSS'
            },
            {
                path:'/msg',  // 如果身份是boss的话，要看的列表肯定就是牛人了。
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            },
            {
                path:'/me',  // 如果身份是boss的话，要看的列表肯定就是牛人了。
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User
            }            
        ]
        if(pathname==='/'){
            return false;
        }
        return (
            <div>
                {/* 变换路由的时候会重新加载这一块。 */}
                {/* 列表头部的显示是根据路由的变化来显示的。*/} 
                <NavBar  mode="dark">
                 {/*使用Array.find来快速查找某一个值，对我现在使用vue来找id是一件极方便的事。shit, 关注语法糖太少了。*/}
                   {navList.find(v=>v.path===pathname).title}
                </NavBar>
                <div> 
                   {/* 中间的路由部分*/}
                   <Switch>
                        {navList.map((v,index)=>(
                            <Route key={index} path={v.path} component={v.component}></Route>
                        ))}
				   </Switch>
                </div>
                {/*这里的底部完全可以写成是一个公共的组件部分。*/}
                <FooterCommon  navList={navList}></FooterCommon>
            </div>
        )
    }
}

export default Contains;