import React,{Component} from 'react'
import Logo from 'components/logo/logo'
import {List, InputItem, Radio ,WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { setRegister } from 'store/reducers'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './register.css'


@connect(
    state=>{
        return {num:state.setCount}
    },
    {setRegister}
)
class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            type:'BOSS',
            user:'',
            password:'',
            confirmPassWord:''
        }
    }
    handleChange=(v,key)=>{
        this.setState({
            [key]:v
        });
    }
    handleRegister=()=>{
        this.props.setRegister(this.state);
        setTimeout(()=>{
            console.log(this.props.num);
        },3000)        
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
               <Logo></Logo>       
               {this.props.num.msg?<p className='errMsgp'>{this.props.num.msg}</p>:null}        
               <h2>这是注册页面</h2>
               {/*这里是路由的跳转界面。通过了redux。。还有redux的errorMsg没有写上去。*/}
               { this.props.num.redirect?<Redirect to={this.props.num.redirect} />:null}
               <WingBlank>
                  <List>
                     <InputItem onChange={(v)=>this.handleChange(v,'user')}>
                        用户
                     </InputItem>
                     <InputItem type='password'   onChange={v=>this.handleChange(v,'password')}>
                        密码
                     </InputItem>
                     <InputItem type='password'   onChange={v=>this.handleChange(v,'confirmPassWord')}>确认密码</InputItem>
                  </List>
                  <WhiteSpace></WhiteSpace>
                  <RadioItem checked={'NB'===this.state.type}    onClick={()=>this.handleChange("NB",'type')}>牛人</RadioItem>
                  <RadioItem checked={'BOSS'===this.state.type}  onClick={()=>this.handleChange('BOSS','type')}>Boss</RadioItem>
                  <WhiteSpace></WhiteSpace>
                  <Button type='primary' onClick={this.handleRegister}>注册页面</Button>
               </WingBlank>
            </div>
        )
    }
}
export default Register;