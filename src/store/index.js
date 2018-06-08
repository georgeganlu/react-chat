import { createStore,combineReducers,applyMiddleware, compose} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
// import chat from './chat-reducer'

let setCount=combineReducers({
    setCount:reducers
});

let store=createStore(setCount,compose(
    applyMiddleware(thunk),
));
export default store;

// 这上面是一种的定义的方法。--对store的话。还有别一种测试的话。
// import {createStore} from 'redux'
// function setCount(state=0,actions){
//     switch(actions.type){
//         case 'add':
//            return state+1;
//         case 'incrs':
//            return state-1;   
//         default:
//            return 10;
//     }
// }
// const store=createStore(setCount);
// function fun(){
//     let num=store.getState();
//     console.log(num);
// }
// store.subscribe(fun);

// store.dispatch({type:"add"});  这里的type才是上面的actions.types的值。多个reducers的话就是合并多个actions.types在一起。
// store.dispatch({type:'asdfasdf'})
// export default store;







