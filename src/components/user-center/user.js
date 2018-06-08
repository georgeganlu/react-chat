import React from 'react'
import {Result, List,WhiteSpace,Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { connect } from 'react-redux'
import { logout } from 'store/reducers'
import { Redirect,withRouter } from 'react-router-dom' 



@connect(
    state=>state.setCount,
    { logout }
)
@withRouter
class User extends React.Component{
    render(){
        const props=this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        console.log(props);
        // 这里返回时先看这个用户存不存在。
        return  (props.user?
            <div>
                <Result
                    img={<img src={require(`assets/imgs/${props.avatar}.png`)} style={{width:50}} alt="" />}
                    title={props.user}
                    message={props.type==='boss'?props.company:null}
                />
                <List renderHeader={()=>'简介'}>
                    <Item  multipleLine>
                        {props.title}
                        {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {props.money?<Brief>薪资:{props.money}</Brief>:null}
                    </Item>                    
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>:<Redirect to={props.redirect} />
        )        
    }
    logout=()=>{
        const alert = Modal.alert;
        alert('注册','确认退出???', [
            { text: '取消', onPress: () =>console.log('取消') },
            { text: '确认', onPress: () =>{
                browserCookie.erase('userId');   // 使用这个去除浏览器的cookie;
                this.props.logout();
            }},
        ]);
        console.log('asdfasdf');
    }
}

export default User;