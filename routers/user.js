const express = require('express');
const router = express.Router();
const User=require('../models/User');

/* router for user page */

/*  function for user data  */

var responseData=null;
router.use(function(req,res,next){
  responseData={
    code:0,
    message:''
  };
  next();
});

router.post('/register',function(req,res,next){
  var username=req.body.username;
  var password=req.body.password;
  var repassword=req.body.repassword;

  if(username==''){
    responseData.code=1;
    responseData.message='用户名不得为空！';
    res.json(responseData);
    return;
  }

  if(password==''){
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
  }).then(function(userInfo){
    if(userInfo){
      responseData.code=4;
      responseData.message='该用户名已被注册！';
      res.json(responseData);
      return;
    }else{
      var user=new User({
        username: username,
        password: password,
        date: new Date().toDateString(),
        view: 0
      });
      return user.save();
    }
  }).then(function(){
    responseData.message='注册成功！';
    res.json(responseData);
  });
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

  if(username==''||password==''){
    responseData.code=1;
    responseData.message='用户名和密码不得为空！';
    res.json(responseData);
    return;
  }

  User.findOne({
    username:username,
    password:password
  }).then(function(userInfo){
    if(!userInfo){
      responseData.code=2;
      responseData.message='用户名或密码错误！';
      res.json(responseData);
      return;
    }else{
      responseData.message='登录成功！';
      responseData.userInfo=userInfo.username;

      req.cookies.set('userInfo',JSON.stringify({
          _id:userInfo._id,
          username:userInfo.username,
          isAdmin:userInfo.isAdmin
        })
      );
      res.json(responseData);
      return;
    }
  });
});

router.get('/logout',function(req,res){
  res.clearCookie('userInfo',{path:'/'});
  res.json(responseData);
  return;
});

module.exports = router;