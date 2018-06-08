import React,{Component} from 'react'
import Logo from '../logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { setLogin } from 'store/reducers'
import {Redirect} from 'react-router-dom'

// 装下来写登录的redux这方面。 connect相当于是传入的两个参数。一个mstp,一个mdtp;
@connect(
    state=>{
        return {record:state.setCount}
    },
    { setLogin }
)
class Login extends Component{
    // 注册有了的话，接下来就是具体的登陆了。
    constructor(props){
        super(props);
        this.state={
            user:'',
            password:''
        }
    }
    register=()=>{  
        this.props.history.push('/register');
    }
    handleChange=(v,key)=>{
        // setState是不能直接赋值的，这是一个函数。  。。。。。。。。。。。
        this.setState({
            [key]:v
        });
    }
    loginUser=()=>{
        this.props.setLogin(this.state);
    }
    // 接下来是页面跳转的逻辑---跳到完善信息，或者说直接改server，让完成注册的同时就跳转到对应的路由页面。

    // 关于login重复跳转到login的问题可以用pathname来解决。
    render(){        
        return (
            <div>
               <Logo></Logo>
               {this.props.record.msg? <p>{this.props.record.msg}</p>:null} 
               <h2>这是登陆的页面。</h2>
               {this.props.record.redirect&&this.props.record.redirect!=='/login'?<Redirect to={this.props.record.redirect} />:null}
               <WingBlank>
                  <List>
                     <InputItem onChange={v=>this.handleChange(v,'user')}>
                        用户
                     </InputItem>
                     <InputItem onChange={v=>this.handleChange(v,'password')}>
                        密码
                     </InputItem>
                  </List>
                  <WhiteSpace></WhiteSpace>
                  <Button type='primary' onClick={this.loginUser}>登陆</Button>
                  <WhiteSpace></WhiteSpace>
                  <Button type='primary' onClick={this.register}>注册</Button>
               </WingBlank>  
            </div>
        )
    }
}
export default Login;