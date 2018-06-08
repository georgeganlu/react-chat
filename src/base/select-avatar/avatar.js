import React,{Component} from 'react'
import './select.scss'
import { Grid } from 'antd-mobile'
// 对grid表格的使用方法。
import img from 'assets/imgs/boy.png'

// 在纯js的表达式中，倾向于使用 require; 在组件中直接导入的时候用import es6.
// 不管是es6的导入还是node中require导入的模式，最终都是实现的common.js的导入。也就是import导入的话最终还是会被babel编译成require()的
// 形式，所以就存在一个问题，差一个promise的babel插件。


class Avatar extends Component{
    constructor(props){
        super(props);
        this.state={
            imgSrc:''
        }
    }
    render(){
        const dataGrid='boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(',')
           .map(el=>({
                //  icon:import(`assets/imgs/${el}.png`),
                //  icon:import(`../../assets/imgs/${el}.png`),
                //  icon:require(`../../assets/imgs/${el}.png`),
                    icon:require(`assets/imgs/${el}.png`),
                 text:el
                   //  这里相当于直接返回一个{},用加大括号的形式的话，就相当于默认使用了es6箭头函数的 ()=> xx 有一个省略的return
               }));
        return (
            <div>
               <div className="titleImg">
                  <span className='item'>选择的图像</span>
                  {this.state.imgSrc?<img   alt='图片显示不正常' className='item' src={this.state.imgSrc}></img>:null}
               </div>
               <Grid data={dataGrid} columnNum={5}  onClick={el=>{ 
                    this.selectHandle(el)
                 }}/>
                {/* 这里已经在是点击的函数里面了，需要的是执行，另一种直接绑定函数的就是事件调用函数执行。 */}
               {/* 这里直接点击就可以进行赋值，同时把赋值过后的值传递回去。 */}
            </div>
        )
    }
    selectHandle=(el)=>{     
        this.setState({
            imgSrc:el.icon
        });
        // 完成选择之后需要把对应选择的头像给返回出去采用props直接传递函数。
        this.props.selectImg(el);
    }
}

export default Avatar