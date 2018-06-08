import React, { Component } from 'react';
import { Provider } from 'react-redux' 
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Register from './components/register/register'
import store from './store/index'
import Login from './components/login/login'
import AuthRouter from './components/authRouter/authRouter'
import Geniusinfo from 'components/genius-info/index'
import Bossinfo from 'components/boss-info/index'
import Contains from 'components/contains/contains'
import Chat from 'components/chat/chat'


// 接下来是bossinfo的信息。

class App extends Component {
  render() {
    return (
      // Route path后面的 / 要想完全配匹还是要加  exact --准确精准的定位。
      <Provider store={store}>
          <Router>
            <div className="App">
               <AuthRouter></AuthRouter>
               <Switch>
                   <Route path='/geniusinfo' component={Geniusinfo} />
                   <Route path='/bossinfo' component={Bossinfo}/>
                   {/*这里到了具体内容的显示列表后就不应该是这种路由的显示了,另一种未命中的方式来显示。里面有公共的头部和尾部。*/}
                   <Route path='/login'  component={Login}/>  
                   <Route path='/register' component={Register}/>
                   {/* 这里新增一个路由chat聊天的路由 */}
                   <Route path="/chat/:id" component={Chat} />
                   <Route component={Contains} ></Route>
               </Switch>                
            </div>
          </Router>  
      </Provider>       
    )
  }
}
export default App;
