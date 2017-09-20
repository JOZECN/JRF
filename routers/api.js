var express = require('express');
var router = express.Router();

var Slide = require('../models/slide');

var responseData=null;
router.use(function(req,res,next){
  responseData={
    code:0,
    message:''
  };
  next();
});

router.get('/', function(req,res,next){
  res.send('JRF-api');
});

router.post('/slide_config_add',function(req,res,next){
  var image=req.body.image;
  var bTitle=req.body.bTitle;
  var sTitle=req.body.sTitle;
  var product=req.body.product;

  if(bTitle==''){
    responseData.code=1;
    responseData.message='大标题不能为空！';
    res.json(responseData);
    return;
  }

  if(sTitle==''){
    responseData.code=2;
    responseData.message='小标题不能为空！';
    res.json(responseData);
    return;
  }

  if(product==''){
    responseData.code=3;
    responseData.message='未选择产品！';
    res.json(responseData);
    return;
  }

  if(responseData.code==0) {
    new Slide({
      image: image,
      bTitle: bTitle,
      sTitle: sTitle,
      product: product
    }).save().then(function () {
      responseData.code = 0;
      responseData.message = '添加成功！';
      res.json(responseData);
      return;
    });
  }
});

router.post('/slide_config_edit',function(req,res,next){
  var id=req.body.id;
  var image=req.body.image;
  var bTitle=req.body.bTitle;
  var sTitle=req.body.sTitle;
  var product=req.body.product;

  if(bTitle==''){
    responseData.code=1;
    responseData.message='大标题不能为空！';
    res.json(responseData);
    return;
  }

  if(sTitle==''){
    responseData.code=2;
    responseData.message='小标题不能为空！';
    res.json(responseData);
    return;
  }

  if(product==''){
    responseData.code=3;
    responseData.message='未选择产品！';
    res.json(responseData);
    return;
  }

  Slide.findOne({
    _id:id
  }).then(function(rs) {
    if (!rs) {
      responseData.code = 4;
      responseData.message = '该轮播ID不存在！';
      res.json(responseData);
      return;
    } else {
      return Slide.update({
        _id: id
      }, {
        image: image,
        bTitle: bTitle,
        sTitle: sTitle,
        product: product
      });
    }
  }).then(function () {
    responseData.code = 0;
    responseData.message='轮播修改成功！';
    res.json(responseData);
    return;
  })
});

router.post('/slide_config_delete',function(req,res,next){
  var id=req.body.id;

  Slide.remove({
    _id:id
  }).then(function(){
    responseData.code=0;
    responseData.message='轮播删除成功! ';
    res.json(responseData);
    return;
  });
});

module.exports = router;