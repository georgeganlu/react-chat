// // es6新的箭头的函数的赋值写法。
// function fun(aa){
//     console.log(aa);
// }
// // 上面的这种情况其实和下面这种是等价的，只是用了匿名函数的方式。 
// // 这种方式就是react中的写法.
// let fun1=(aa)=>{    
//     console.log(aa);
// }
// // fun('asdf');
// // fun1('asdf');

// // 还有一种写法就是给给函数的形参赋初始值
// function fun2(obj='asdf'){
//     console.log(obj);
// }
// fun2();


// 下面是Object的展开操作符。
let obj={
   "person":'张三',
   'key':'李四'
};
// console.log(Object.keys(obj));
// console.log(Object.values(obj));
// console.log(Object.entries(obj));

// 上面是第一种常见的运算符。
// 第二种是计算属性的一种。
let str='adsfasdf';
// 这里相当于str这个的作用是一个变量。也就是可以解释在mutations和mutations-types之单定义名的问题。
let obj2={
    [str]:'zxcvzxcv',  //这里代表了计算属性。
    str,  //这里就直接代表了这个变量和变量的值。
    hello:function(){

    },
    hello1(){

    }
};
// console.log(obj2);


// 关于对象扩展的展开合并符。
let obj3={name:'aasdf','sub':'imooc'};
let obj4={name:'张三',kiss:'what are you doing'};

// 合并这两个对象。就不会在用上Object.assign()合并这个方法了。
// console.log({...obj3,...obj4,status:'ok'});  //这里相当于直接合并了。



// 下一个是对象和数组的快速解构的赋值。
let arr=['asdf','zxcv'];
let [str1,str2]=arr;

// console.log(str1,str2);  


// 下面是一个重点，对于数组的快速去重。Set数据结构。




