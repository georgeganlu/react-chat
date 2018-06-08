import React,{Component} from 'react'
import { NavBar,List, InputItem,Button,TextareaItem,WhiteSpace } from 'antd-mobile'
import Avatar from 'base/select-avatar/avatar'
import { connect} from 'react-redux'
// 这里是牛个补充资料的页面。选择头像这个一定是一个base的组件。
import { updata } from 'store/reducers'
import {Redirect} from 'react-router-dom'

// 现在是利用装饰器来提交数据的时候。
@connect(
    state=>state.setCount,
    {updata}
)
class Geniusinfo extends Component{
    constructor(props){
        super(props);
        this.state={
            avatar:'',
            title:'',
            desc:''
        }
    }
    render(){
        let redirectTo=this.props.redirect;
        let path=this.props.location.pathname;
        return (
            <div>
              {/* 这里与登陆界面来保持一致。updata之后直接进行路由的跳转*/}
              { redirectTo&&path!==redirectTo?<Redirect to={this.props.redirect} />:null}
               <NavBar mode="dark">
                   完善信息
               </NavBar>
               {/* 下面是对应的选择图片组件。 */}
               <Avatar  selectImg={this.selectImg}></Avatar>
               {/* 下面是具体的要求部分。*/}
               <WhiteSpace size="xs" />
               <List>
                    <InputItem onChange={(v)=>this.handleChange(v,'title')}>求职岗位</InputItem>
                    <WhiteSpace size="xs" />
                    <TextareaItem title="个人简介" rows={5} count={100}  onChange={(v)=>this.handleChange(v,'desc')}  />
               </List>
               <WhiteSpace size="lg" />
               <Button type='primary' onClick={this.saveHandle}>保存</Button>
            </div>
        )
    }
    selectImg=(el)=>{
        // 这里应该是传递回来的元素。
        this.setState({
            avatar:el.text
        });
    }
    handleChange=(v,key)=>{
        this.setState({
            [key]:v
        })
    }
    saveHandle=()=>{
        this.props.updata(this.state);
        // 点击更新对应的信息后就会到对应的列表去了。

    }
}

export default Geniusinfo