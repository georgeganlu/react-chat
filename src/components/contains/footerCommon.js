import React,{Component} from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom' 
import './common.scss'
import { connect } from 'react-redux'

@withRouter
@connect(
    state=>state.setCount,
    null
)
class FooterCommon extends Component{
    // 这里的propTypes相当于一个指定的静态属性对象，里面定义的都是传过来的值---一定要注意propTypes的这个属性与 PropTypes这
    // 个引进来的类。
    static propTypes ={
        navList : PropTypes.array.isRequired
    }
    render(){
        // 首先先过滤掉是隐藏的内容。
        let navListData=this.props.navList.filter(v=>!v.hide);
        const {pathname}=this.props.location;
        return (
            <div className='bottomDiv'>
                <TabBar>
                {navListData.map(v=>(
                    <TabBar.Item 
                        badge={v.path==="/msg"?this.props.unread:0}
                        icon={{ uri: require(`./imgs/${v.icon}.png`) }}
                        selectedIcon={{ uri: require(`./imgs/${v.icon}-active.png`) }}
                        title={v.text}
                        key={v.path}
                        selected={pathname === v.path}
                        onPress={() => {
                           this.props.history.push(v.path);
                        }} 
                    />
                ))}               
                </TabBar>    
            </div>
        )
    }
}
export default FooterCommon;