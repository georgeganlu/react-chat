const express=require('express');
const Router=express.Router();
const mongodbModel=require('./mogodb');
const Chat=mongodbModel.getModel('chat');
const User=mongodbModel.getModel('user');
// const io=require('./server');
// 在这里要对数据进行加密。先引入md5常用的一种中间件。


Router.get('/getmsg',(req,res)=>{
     let {userId}=req.cookies;
     if(!userId){
        return res.json({
             code:1
         })
     }
     let usersList={};

     User.findOne({_id:userId},(e,d)=>{
         if(!e){            
            User.find({'$nor':[{type:d.type}]},(err,doc)=>{                
                doc.forEach(el => {
                    usersList[el._id]={name:el.user,avatar:el.avatar}
                });
                Chat.find({'$or':[{from:userId},{to:userId}]},(err,d)=>{
                    res.json({
                        code:0,
                        data:d,
                        usersList:usersList
                    })
                }) 
            });
         }
     });
    //  这里查询的时候，是以这个用户的id去找这个用户的聊天记录。相当于一次过滤。      
});

Router.post('/updataRead',(req,res)=>{
    let {userId}=req.cookies;
     if(!userId){
        return res.json({
             code:1
         })
     }
     let {from}=req.body;
     Chat.update({from:from,to:userId},{read:true},{multi:true},(err,doc)=>{
         if(!err){
             let num=doc.ok;
             Chat.find({},(e,d)=>{
                 res.json({
                     code:0,
                     num:num,
                     data:d
                 })
             })
         }
     })
});

module.exports=Router;