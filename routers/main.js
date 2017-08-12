const express = require('express');
const router = express.Router();

router.get('/', function(req,res,next){
  res.render('main/index');
});

router.get('/login', function(req,res,next){
  res.render('main/login');
});

router.get('/admin', function(req,res,next){
  res.render('admin/index');
});

module.exports = router;