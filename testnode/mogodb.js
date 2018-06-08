// const mongoose = require('mongoose');
// const DB_URL='mongodb://127.0.0.1:27017/george-react';
// mongoose.connect(DB_URL);

// mongoose.connection.on('connected',()=>{
//     console.log('已经连接上了mongodb了---ok');
// });
// 现在是对mongodb的测试---增-删-改-查。

// 新建一个Schema--表或是计划。 //这里相当于建表并给这个表的数据定义数据类型。
// let schema=new mongoose.Schema({
//     user:{
//         type:String,
//         require:true
//     },
//     age:{
//         type:Number,
//         require:true
//     }
// });
// 接下来通过model把schema表编译生成document文档对象。
// const User=mongoose.model('user',schema);
//  1.接下来新增数据。
// User.create({
//     user:'george',
//     age:28
// },(err,doc)=>{
//     if(!err){
//         console.log(doc);
//     }else{
//         console.log(err);
//     }
// })
// 直接的4个操作就是   create  find   remove  updata

// User.remove({user:'george'},(err,doc)=>{
//     if(!err){
//         console.log('删除成功');
//     }
// })


// 按照刚才写的步骤全新来测试一次mongodb。
const mongoose=require('mongoose');
const URL="mongodb://127.0.0.1:27017/george-chat";
mongoose.connect(URL);
mongoose.connection.on('connected',()=>{
    console.log('OK,mongodb连接成功');
});
// 新建 schema文档表。
// 注意建表常用的套路。
const models={
    user:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        // 头像图片。
        'title':{type:String},
        'avatar':{type:String},
        // 个人或boss简介。
        'desc':{type:String},
        // 如果你是boss的话,还应该有两个字段。
        'company':{type:String},
        'money':{type:String}
    },
    // 上面是一个user的模型表，还需要为定义一个存内容用的model表。
    chat:{
        // 设计chat聊天的的内容。
        'chatId':{type:String,require:true},
        'from':{type:String,require:true},
        'to':{type:String,require:true},
        'read':{type:Boolean,default:false},
        'content':{type:String,require:true},
        'createTime':{type:Number,require:true}
    }
}

for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]));  // new  mongoose.Schema({}),把设定好的字段形成document,
    // mongoose.model把文档对象形成一个model数据模型表。
}
module.exports={
    getModel:function(name){
        return mongoose.model(name);
    }
}



