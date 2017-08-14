const express = require('express');
const router = express.Router();

/*  router for main page  */

router.get('/', function(req,res,next){
  res.render('main/index',{
    userInfo:req.userInfo
  });
});

router.get('/about', function(req,res,next){
  res.render('main/about',{
    userInfo:req.userInfo
  });
});

router.get('/login', function(req,res,next){
  res.render('main/login',{
    userInfo:req.userInfo
  });
});

router.get('/admin', function(req,res,next){
  res.render('admin/index',{
    userInfo:req.userInfo
  });
});

/*  function for main data  */

module.exports = router;