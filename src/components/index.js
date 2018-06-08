import React,{ Component } from 'react' 
import { list } from 'postcss';
import { connect } from 'react-redux'
import { setHome } from '../store/reducers-types'

// 这里是home首页的内容。
class App extends Component{
   render(){
       let obj={
           payload:{
               count:2
           }
       }
    //    console.log(this.props.set(obj));
       return (
           <div>
              asdfasdfadsfasdfa231231
              <div></div>
              <button onClick={this.handleX}>点击增加</button>
              {/*<Yiying yizhang='大彪'></Yiying> 
              <DivFile></DivFile>
              <Homex></Homex>*/}
              <hr />
              {this.props.num}
              <hr />
           </div>
       )
   }
   handleX=()=>{
       let params={
            count:1
       }
       this.props.set(params);
   }
}
// 组件的第一个字母必须是大写。这种是简写的组件的形式。,一个组件的首字母必须是大写的。在次强调。
const DivFile=()=>{
    return (
        <div>
           <p>asdfasdf</p>
        </div>
    )
}  
const Homex = () => (
    <div>
      <h2>Home</h2>
    </div>
)
// 这种是一种定义的方式，还有另外一种定义的方式。
class Yiying extends Component{
    constructor(props){
        // super在es6中是调用父级对象的this;
        super(props);
        this.state={
            newArr:['apple','alex','owen']
        }
    }
    handle=()=>{
        // 绑定this的三种写法。
        console.log('写法ok');
        // 相当于绑定好函数后直接在函数主体中进行执行。
        this.setState({
            newArr:[...this.state.newArr,'alen']
        });
    }
    // 要能够进行随心所欲的控制。在规则和连界内做事。 真的是需要不停枯燥的练习中成长。
    render(){
        let arr=['虎子','李子','高子','生子'];
        // 在jsx要进行变量的书写还是要放在大括号内的。
        return (
            <div>
               一营的营长是{this.props.yizhang},你是谁？
               <div>
                  <button onClick={this.handle}>点击之后会增加alen</button>
               </div>
               <ul>
                  {
                      this.state.newArr.map((el,index)=>{
                          return (
                              <li key={index}>{el}</li>
                          )
                      })
                  }
               </ul>
            </div>
        )
    }
}

// 先是生成两个映射。
const mstp=(state)=>{
    // console.log(state);
    return {
        num:state.setCount.count
    }
}
const mdtp=(dispatch)=>{
   return {
       set:(payload)=>{
          dispatch(setHome(payload));
       }
   }
}
export default connect(mstp,mdtp)(App);