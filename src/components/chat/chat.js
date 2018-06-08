import React,{ Component } from 'react'
import { List, InputItem , NavBar, Icon,Grid } from 'antd-mobile'
import './chat.scss'
import { connect } from 'react-redux'
import { recevieMsg,_getMsgList,sendMsg,updataRead } from 'store/reducers'
// import axios from 'axios'
import { handleId } from 'base/util'

const Item = List.Item;

// 这里把进入就请求有多少条数据和监听数据的接受直接放到公共的消息列表中去。
@connect(
    state=>state.setCount,
    { sendMsg,recevieMsg,_getMsgList,updataRead }
)
class Chat extends Component{
    constructor(props){
        super(props);
        this.state={
            content:'',
            showEmoji:false
        }
    }
    componentDidMount(){
        // 当这个组件加载完成后，先进行信息的拉取。 
        // this.props._getMsgList();
        // 在进行信息的接收监听。
        this.props.recevieMsg();
        // 进入这个页面后就发送更新的请求。
        let from=this.props.match.params.id;
        this.props.updataRead({from:from});
    }
    sendMsgx=()=>{
        // sendMsg就是发送信息了到actions中去。
        // 发送信息的话，应该是有4部分的内容。 from to content 还有一个id是合成的。
        let from=this.props._id;  // 使用id来记录账户  // 这里的from是相对于来自我自己的。 
        let to=this.props.match.params.id;  // params是对方的内容。
        let content=this.state.content;        
        this.props.sendMsg({from,to,content});
        this.setState({
            content:''
        });
    }
    fixSmile=()=>{
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'));
        },0)
    }
    render(){
        const usersList=this.props.usersList;
        // 这里要的只是对方和自已的头像。自已的头像有。
        const owerAvatar=require(`assets/imgs/${this.props.avatar}.png`);  // 自已的头像。
        const paramsId=this.props.match.params.id;
        const objData=usersList[paramsId];
        const avatar=require(`assets/imgs/${objData.avatar}.png`);
        let idNew=handleId(this.props._id,this.props.match.params.id);
        let msgNew=this.props.msgList.filter(v=>v.chatId===idNew);
        
        const emoji='😀 😀 😂 🤣 😃 😅 😆 😋 😉 😍 😘 😗 🙈 🙈 🐱 🐈 🦄 🐽 🐪 🐔 🐸 🐍 🐟 🌹 🌱 🌞 ⚡ 🔥 😍 😠 🤢 💂‍ 👼 🧝‍ 🙅‍ 🚶 👈 ✋ 👊 👁️ 👨‍🔬 🖐️ 🎧 🎤 🏆 🏓'
                    .split(' ').map(v=>({text:`${v}`}));
        return (
            <div>
                <NavBar  
                   icon={<Icon type="left" />}
                   onLeftClick={() => this.props.history.goBack(-1)}
                   mode="dark">
                    {/*使用Array.find来快速查找某一个值*/}
                    {objData.name}
                </NavBar>
               <div>
                  { msgNew.map((v,index)=>(
                      v.from===this.props.match.params.id?                      
                        <List  key={index}>
                            <Item 
                               thumb={avatar}
                            >{v.content}
                            </Item>
                        </List>:
                        <List  key={index}>
                            <Item className="my-list"
                               thumb={owerAvatar}
                               >{v.content}</Item>
                        </List>                     
                  ))}
               </div>
               <div className="entryInfo"> 
                  <List>
                      <InputItem key='id'
                         placeholder="请输入"
                         value={this.state.content}
                         onChange={
                             v=>this.handleChange('content',v)
                         }
                         extra={ <div> <span className='smileNew' onClick={()=>{
                            this.setState({showEmoji:!this.state.showEmoji})
                            this.fixSmile()
                         }}>😉</span><span  onClick={this.sendMsgx}>发送</span></div>}
                      >    
                      信息</InputItem>                        
                  </List>
                  {this.state.showEmoji?<Grid  data={emoji} 
                            carouselMaxRow={3} 
                            isCarousel={true}
                            square={true} columnNum={9}
                            onClick={el => this.setState({content:this.state.content+el.text})}
                         />:null}                
               </div>               
            </div>
        )
    }
    handleChange=(key,v)=>{
        this.setState({
            [key]:v
        })
    }
}
export default Chat;