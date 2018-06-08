import React,{Component} from 'react'
import { withRouter } from 'react-router-dom'
import { WingBlank, Card,WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'


@withRouter
class CommonCard extends Component{
    static propTypes={
        userList:PropTypes.array.isRequired
    }
    render(){
        return (
            <WingBlank>
             <WhiteSpace></WhiteSpace> 
             {this.props.userList.map(v=>(
                v.avatar?<Card  onClick={this.handlePush.bind(this,v._id)}  key={v._id}>
                    <Card.Header
                      title={v.user}
                      thumb={require(`assets/imgs/${v.avatar}.png`)}
                      extra={<span>{v.title}</span>}/>
                    <Card.Body>
                       {v.type==='BOSS'?<div>公司:<span>{v.company}</span></div>:null}
                       {v.desc.split('\n').map(v=>(
                           <div key={v}>{v}</div>
                       ))}
                       {v.type==='BOSS'? <div>薪资:{v.money}</div> :null}
                    </Card.Body>                    
                </Card>:null
            ))}                
            </WingBlank>
        )
    }   
    handlePush=(id)=>{
        this.props.history.push(`/chat/${id}`);
    }
}
export default CommonCard;