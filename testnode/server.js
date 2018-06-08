const express=require('express');
const mongoose = require('mongoose');
const User=require('./user');
const Chat=require('./chat');

// 引入新的聊天数据的表。
const mongodbModel=require('./mogodb');
const weChat=mongodbModel.getModel('chat');

// 在服务的页面引入丙个中间件，分别来解析post提交的数据和cookie的数据。分别是bodyParser 和cookieParser;
const bodyParser=require('body-parser');  // 一般解析两种数扰，一种是application-json形式数据，一种是url-code形式。
const cookieParser=require('cookie-parser');
// 引入的两个中间件需要分别注册一下。
let app=express();
let Server=require('http').Server(app);
var io = require('socket.io')(Server);

io.on('connection',(socket)=>{
    socket.on('sendmsg',(data)=>{
        let {from,to,content}=data;
        // 这里新建保存时使用了sort()来排序,无方法来排序，不管是谁发给谁的用户id是一致的，导致chatId我发给你和你发给我的这条信息的chatId一致。
        let chatId=[from,to].sort().join('-');
        // 保存新建的聊天后，把聊天的内容返回回去。
        weChat.create({chatId,from,to,content,createTime:new Date().getTime()},(err,d)=>{
            if(!err){
                // 传回去的全部信息全部是跟这个人有关的信息。
                weChat.find({},(e,doc)=>{
                    io.emit('recevie',{
                        data:doc
                    });
                })
            }            
        })        
    })
})
app.use(cookieParser());
app.use(bodyParser.json());  // 解板application-json形式的数据。

app.use('/user',User);
app.use('/user',Chat);

Server.listen(4000,'192.168.12.51',()=>{
    console.log('OK,起动的地址是192.168.1.101:4000');
});

module.exports=io;