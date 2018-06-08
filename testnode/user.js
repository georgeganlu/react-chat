const express=require('express');
const Router=express.Router();
const mongodbModel=require('./mogodb');
const User=mongodbModel.getModel('user');
// 在这里要对数据进行加密。先引入md5常用的一种中间件。
const utils=require('utility');

// 错误返回的格式。
const ErrObj={
    "msg":'后台出错',
    "code":'3',
    "payload":{}
}
const SuccesOk={
    "msg":'ok',
    "code":'0000',
    "payload":{}
}

// 验证刷新cookie的。
Router.get('/info',(req,res)=>{
    let {userId}=req.cookies;
    if(!userId){
      return res.json({
            code:1
        });
    }
    User.findOne({_id:userId},(e,d)=>{
        if(!e){
            res.json({
                code:0,
                msg:'存在对应cookie',
                data:d
            });
        }
    })
});

// 这里是注册
Router.post('/register',(req,res)=>{
    let {user,type,password}=req.body;
    // 现在是通过修改让用户注册后直接跳转到对应的登陆页面。
    // 第一步同样是验证这个账号有没有被注册,如果没有的话就保存这个账号。
    User.findOne({user},(e,d)=>{
        if(d){
            // 存在。  //返回code为1 同时也代表了这个用户存在。
            res.json({
                code:1,
                msg:'这个用户已经存在'
            });
        }else{
            let newpass=crypto(password);
            // 换成别一种方式的写法。mongoose保存的写法。
            let registerModel=new User({
                user,
                type,
                pwd:newpass
            });
            registerModel.save((e,d)=>{
                // 这里是新增保存。
                if(e){
                  return res.json({
                        code:0,
                        msg:'后端出错'
                    });
                }
                let {user,type,_id}=d; // save出来的数据也是一条数据，就是一个object的数据。
                // 现在设置cookie; 设置cookie的方法就是直接传入两个值，第一个是key，后一个value.
                res.cookie('userId',_id);
                res.json({
                    code:0,
                    data:{
                        user,
                        type
                    }
                })
            })
        }
    })
});

// 这里是完善更新信息的部分。
Router.post('/updata',(req,res)=>{
     // 第一步还是获取并验证cookie,由于这里的cookie是使用的用户名的id。后期查找的话，可以通过userid这个值，去数据库里面找到这条数据
     // 的id,并更新这条数据之后进行返回。
     const {userId}=req.cookies;
     if(!userId){
        return res.json({
             code:1
         })
     }
     User.findByIdAndUpdate(userId,req.body,{new:true},(err,d)=>{
         res.json({
             code:0,
             data:d
         });
     })
});
// 这里登陆
Router.post('/login',(req,res)=>{
    let {user,password}=req.body;
    // 在查询的中间的第二个参数是用来限制输出的文档的，不包括pwd这个字段。
    User.findOne({user:user,pwd:crypto(password)},{'pwd':0},(e,d)=>{
        if(!e){
            if(!d){
                let obj={
                    msg:'不存在此账号',
                    code:1
                };
                res.json(obj);
            }else{
                // 直接可以通过后端来设置cookie;
                res.cookie('userId',d._id);
                let obj={
                    msg:"登陆成功",
                    code:0,
                    data:d
                };
                res.json(obj);
            }
        }else{
            res.json(ErrObj);        
        }
    });
});

// 获取是牛人还是boss的列表数据。
Router.get('/list',(req,res)=>{
    const {userId}=req.cookies;
     if(!userId){
        return res.json({
             code:1
         })
     }
     let {type}=req.query;
     User.find({type},(e,d)=>{
        //  查找进行过滤。
        res.json({
            code:0,
            data:d
        });
     })
});




Router.get('/test',(req,res)=>{
    User.find({},(err,doc)=>{
        if(!err){
            res.json(doc);
        }
    });
});
// 建一个专门用来清空数据库。
Router.get('/clear',(req,res)=>{
    User.remove({},(e,d)=>{
        res.json(
            {
                data:d
            }
        )
    })
});


module.exports=Router;

// 接下来是要去数据库进行加密。
function crypto(val){
    let str=val+'#kdfksdkfkl';
    let newstr=utils.md5(utils.md5(str));
    return newstr;
}

