import React,{Component} from 'react'
import { connect } from 'react-redux'
import { getListData } from 'store/reducers'
import CommonCard from 'base/user-card/card'

@connect(
    state=>state.setCount,
    { getListData }
)
class Genius extends Component{
    // 这里的列表componentDidMount，是要把所有的满足条件的列表查询出来。
    componentWillMount(){
        // 在第一次加载渲染完成后去取回相应的数据。
        this.props.getListData('BOSS');
    }
    render(){
        return <CommonCard  userList={this.props.userList}></CommonCard>
    }
}
export default Genius;