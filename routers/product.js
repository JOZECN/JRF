const express = require('express');
const router = express.Router();

const Product = require('../models/product');

/*  main  */

router.get('/', function(req,res,next){
  res.render('main/products',{
    userInfo:req.userInfo
  });
});

router.get('/detail', function(req,res,next){
  res.render('main/detail',{
    userInfo:req.userInfo
  });
});

/*  admin  */

var responseData=null;
router.use(function(req,res,next){
  responseData={
    code:0,
    message:''
  };
  next();
});

router.post('/product_add',function(req,res,next){
  var name=req.body.name;
  var description=req.body.description;
  var feature=req.body.feature;

  if(name==''){
    responseData.code=1;
    responseData.message='产品名称不得为空！';
    res.json(responseData);
    return;
  }
  if(description==''){
    responseData.code=2;
    responseData.message='产品描述不得为空！';
    res.json(responseData);
    return;
  }
  if(feature==''){
    responseData.code=3;
    responseData.message='产品特点不得为空！';
    res.json(responseData);
    return;
  }

  if(responseData.code!=1&&responseData.code!=2&&responseData.code!=3){
    new Product({
      name:req.body.name,
      category:req.body.category,
      description:req.body.description,
      feature:req.body.feature,
      income:req.body.income,
      company:req.body.company,
      sort:req.body.sort,
      time:req.body.time,
      pay:req.body.pay,
      dealline:req.body.dealline,
      qualify:req.body.qualify,
      area:req.body.area,
      date:new Date().toDateString(),
      user:'',//req.userInfo._id,
      view:0
    }).save().then(function(){
      responseData.code=4;
      responseData.message='产品添加成功';
      res.json(responseData);
      return;
    });
  }
});

module.exports = router;