const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const Category = require('../models/category');

var responseData=null;
router.use(function(req,res,next){
  responseData={
    code:0,
    message:''
  };
  next();
});

/*  main  */

router.get('/', function(req,res,next){
  Product.find().populate(['category','user']).then(function (product) {
    Category.find().then(function (category) {
      res.render('main/product', {
        userInfo:req.session.user,
        product: product,
        category: category
      })
    })
  })
});

router.get('/product_detail', function(req,res,next){
  var id=req.query.id;

  Product.findOne({
    _id: id
  }).populate(['category']).then(function(rs){
    if(!rs){
      res.render('main/error',{
        userInfo:req.session.user,
        message:'该产品id已被删除了。'
      });
      return;
    }else {
      //console.log(rs);
      res.render('main/product_detail', {
        userInfo: req.session.user,
        data: rs
      })
    }
  })
});

/*  admin  */

router.post('/product_add',function(req,res,next){
  var name=req.body.name;
  var description=req.body.description;
  var feature=req.body.feature;

  if(name===''){
    responseData.code=1;
    responseData.message='产品名称不得为空！';
    res.json(responseData);
    return;
  }
  if(description===''){
    responseData.code=2;
    responseData.message='产品描述不得为空！';
    res.json(responseData);
    return;
  }
  if(feature===''){
    responseData.code=3;
    responseData.message='产品特点不得为空！';
    res.json(responseData);
    return;
  }

  if(responseData.code===0){
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
      image: req.body.image,
      date:new Date().toDateString(),
      user:req.body.user,
      view:0
    }).save().then(function(){
      responseData.code=0;
      responseData.message='产品添加成功';
      res.json(responseData);
      return;
    });
  }
});

router.post('/product_edit',function(req,res,next){
  var id=req.body.id;
  var name=req.body.name;
  var description=req.body.description;
  var feature=req.body.feature;

  if(name===''){
    responseData.code=1;
    responseData.message='产品名称不得为空！';
    res.json(responseData);
    return;
  }
  if(description===''){
    responseData.code=2;
    responseData.message='产品描述不得为空！';
    res.json(responseData);
    return;
  }
  if(feature===''){
    responseData.code=3;
    responseData.message='产品特点不得为空！';
    res.json(responseData);
    return;
  }

  if(responseData.code===0){
    Product.findOne({
      _id: id
    }).then(function (rs) {
      if(!rs) {
        responseData.code = 4;
        responseData.message = '该产品ID不存在！';
        res.json(responseData);
        return;
      }else{
        return Product.update({
          _id: id
        },{
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
          image: req.body.image,
          date:new Date().toDateString(),
          user:req.body.user,
          view:Number(rs.view)
        })
      }
    }).then(function(){
      responseData.code=0;
      responseData.message='产品修改成功';
      res.json(responseData);
      return;
    });
  }
});

router.post('/product_delete',function(req,res,next){
  var id=req.body.id;

  Product.remove({
    _id:id
  }).then(function(){
    responseData.code=0;
    responseData.message='产品删除成功! ';
    res.json(responseData);
    return;
  });
});

module.exports = router;