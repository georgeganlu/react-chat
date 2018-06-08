// 为的是检验路由是否是成立的。
import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from 'store/reducers'

// 这里每次刷新都会重新验证用户有没有登陆。
@withRouter
@connect(
    state=>state.setCount,
    {loadData}
)
class AuthRouter extends React.Component{
    componentDidMount(){
        // 获取用户的信息。
        axios.get('/user/info').then(res=>{
            if(res.status===200){
                if(res.data.code===0){
                    console.log('已经登录了。');
                    this.props.loadData(res.data.data);
                }else{
                    // console.log(this.props.history);
                    this.props.history.push('/login');
                }
            }
        })
    }
    render(){
        return null;
    }
}
export default AuthRouter;