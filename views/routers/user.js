const express = require('express');
const router = express.Router();
const crypto = require("crypto");

const User=require('../models/user');

var responseData=null;
router.use(function(req,res,next){
  responseData={
    code:0,
    message:''
  };
  next();
});

/* router for user page */

router.get('/',function (req,res,next) {
  var username = req.session.user.username;

  User.findOne({username: username}).then(function (rs) {
    if(!rs){
      res.render('main/404');
    }else {
      res.render('main/user',{
        userInfo: req.session.user,
        data: rs
      })
    }
  })
});

/*  function for user data  */

router.post('/register',function(req,res,next){
  var username=req.body.username;
  var password=req.body.password;
  var repassword=req.body.repassword;

  var md5 = crypto.createHash("md5");
  var newPas = md5.update(password).digest("hex");

  if(username===''){
    responseData.code=1;
    responseData.message='用户名不得为空！';
    res.json(responseData);
    return;
  }

  if(password===''){
    responseData.code=2;
    responseData.message='密码不得为空！';
    res.json(responseData);
    return;
  }

  if(repassword!==password){
    responseData.code=3;
    responseData.message='两次密码不一致！';
    res.json(responseData);
    return;
  }

  User.findOne({
    username:username
  }).then(function(user) {
    if (!user) {
      new User({
        username: username,
        password: newPas,
        date: new Date().toDateString(),
        view: 0
      }).save().then(function () {
        responseData.message = '注册成功！';
        res.json(responseData);
      })
    } else {
      responseData.code = 4;
      responseData.message = '该用户名已被注册！';
      res.json(responseData);
      return;
    }
  })
});

router.post('/registerCheck',function(req,res,next){
  var username=req.body.username;

  User.findOne({
    username:username
  }).then(function(userInfo){
    if(userInfo){
      responseData.code=4;
      responseData.message='该用户名已被注册！';
      res.json(responseData);
      return;
    }else{
      responseData.code=5;
      responseData.message='<i class="icon-ok"></i>';
      res.json(responseData);
      return;
    }
  });
});

router.post('/login',function(req,res,next){
  var username=req.body.LoginUsername;
  var password=req.body.LoginPassword;

  var md5 = crypto.createHash("md5");
  var newPas = md5.update(password).digest("hex");

  if(username==''||password==''){
    responseData.code=1;
    responseData.message='用户名和密码不得为空！';
    res.json(responseData);
    return;
  }

  User.findOne({
    username:username,
    password:newPas
  }).then(function(user){
    if(!user){
      responseData.code=2;
      responseData.message='用户名或密码错误！';
      res.json(responseData);
      return;
    }else{
      user.view++;
      //userInfo.loginTime=new Date();
      user.save();
      responseData.message='登录成功！';

      req.session.user = {
        '_id':user._id,
        'username':user.username,
        'isAdmin': user.isAdmin,
        'userImg':user.userImg
      };

      /*req.cookies.set('userInfo',JSON.stringify({
          _id:userInfo._id,
          username:userInfo.username,
          isAdmin:userInfo.isAdmin
        })
      );*/
      res.json(responseData);
      return;
    }
  });
});

router.get('/logout',function(req,res){
  req.session.user = null;
  res.json(responseData);
  return;
});

router.post('/user_save',function(req,res,next){
  var name=req.body.name;
  var eMail=req.body.eMail;
  var phoneNum=req.body.phoneNum;

  if(name==''){
    responseData.code=1;
    responseData.message='真实姓名不得为空！';
    res.json(responseData);
    return;
  }
  if(eMail==''){
    responseData.code=2;
    responseData.message='E-mail不得为空！';
    res.json(responseData);
    return;
  }
  if(phoneNum==''){
    responseData.code=3;
    responseData.message='手机号码不得为空！';
    res.json(responseData);
    return;
  }

  if(responseData.code==0){
    User.findOne({
      username: req.session.user.username.toString()
    }).then(function (rs) {
      if(!rs) {
        responseData.code = 4;
        responseData.message = '该用户不存在！';
        res.json(responseData);
        return;
      }else{
        return User.update({
          username: req.session.user.username.toString()
        },{
          name:req.body.name,
          eMail:req.body.eMail,
          phoneNum:req.body.phoneNum
        })
      }
    }).then(function(){
      responseData.code=0;
      responseData.message='用户信息修改成功';
      res.json(responseData);
      return;
    });
  }
});

router.post('/user_change_password',function(req,res,next){
  var oldPassword=req.body.oldPassword;
  var password=req.body.password;
  var confirmPassword=req.body.confirmPassword;

  if(oldPassword==''){
    responseData.code=1;
    responseData.message='原始密码不得为空！';
    res.json(responseData);
    return;
  }
  if(password==''){
    responseData.code=2;
    responseData.message='新密码不得为空！';
    res.json(responseData);
    return;
  }
  if(confirmPassword==''){
    responseData.code=3;
    responseData.message='重复密码不得为空！';
    res.json(responseData);
    return;
  }
  if(confirmPassword != password){
    responseData.code=4;
    responseData.message='两次密码不一致！';
    res.json(responseData);
    return;
  }

  if(responseData.code==0){
    User.findOne({
      username: req.session.user.username.toString()
    }).then(function (rs) {
      if(!rs) {
        responseData.code = 5;
        responseData.message = '该用户不存在！';
        res.json(responseData);
        return;
      }else if(rs.password != oldPassword){
        responseData.code = 6;
        responseData.message = '原始密码错误！';
        res.json(responseData);
        return;
      }else{
        return User.update({
          username: req.session.user.username.toString()
        },{
          password:req.body.password
        })
      }
    }).then(function(){
      responseData.code=0;
      responseData.message='密码修改成功';
      res.json(responseData);
      return;
    });
  }
});

module.exports = router;