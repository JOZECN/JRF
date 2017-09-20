var express = require('express');
var router = express.Router();

var responseData=null;
router.use(function(req,res,next){
  responseData={
    code:0,
    message:''
  };
  next();
});

var Question=require('../models/question');
var Answer=require('../models/answer');

/*  main  */

router.get('/', function(req,res,next){
  res.render('main/adviser',{
    userInfo:req.session.user
  });
});

/*  admin  */

router.post('/question_add',function(req,res,next){
  var name=req.body.name;

  if(name==''){
    responseData.code=1;
    responseData.message='问题名称不得为空！';
    res.json(responseData);
    return;
  }

  if(responseData.code==0){
    new Question({
      name:req.body.name,
      answerA:req.body.answerA,
      answerB:req.body.answerB,
      answerC:req.body.answerC,
      answerD:req.body.answerD
    }).save().then(function(){
      responseData.code=0;
      responseData.message='问题添加成功';
      res.json(responseData);
      return;
    });
  }
});

router.post('/question_edit',function(req,res,next){
  var id=req.body.id;
  var name=req.body.name;

  if(name==''){
    responseData.code=1;
    responseData.message='问题名称不得为空！';
    res.json(responseData);
    return;
  }

  if(responseData.code==0){
    Question.findOne({
      _id: id
    }).then(function (rs) {
      if(!rs) {
        responseData.code = 4;
        responseData.message = '该问题ID不存在！';
        res.json(responseData);
        return;
      }else{
        return Question.update({
          _id: id
        },{
          name: req.body.name,
          answerA: req.body.answerA,
          answerB: req.body.answerB,
          answerC: req.body.answerC,
          answerD: req.body.answerD
        })
      }
    }).then(function(){
      responseData.code=0;
      responseData.message='问题修改成功';
      res.json(responseData);
      return;
    });
  }
});

router.post('/question_delete',function(req,res,next){
  var id=req.body.id;

  Question.remove({
    _id:id
  }).then(function(){
    responseData.code=0;
    responseData.message='问题删除成功! ';
    res.json(responseData);
    return;
  });
});

router.post('/answer_add',function(req,res,next){
  var answer=req.body.answer;
  var product=req.body.product;

  if(answer==''){
    responseData.code=1;
    responseData.message='问题答案不得为空！';
    res.json(responseData);
    return;
  }

  if(product==''){
    responseData.code=2;
    responseData.message='产品选择不得为空！';
    res.json(responseData);
    return;
  }

  if(responseData.code==0){
    new Answer({
      answer:req.body.answer,
      product:req.body.product
    }).save().then(function(){
      responseData.code=0;
      responseData.message='答案添加成功';
      res.json(responseData);
      return;
    });
  }
});

router.post('/answer_edit',function(req,res,next){
  var id=req.body.id;
  var answer=req.body.answer;
  var product=req.body.product;

  if(answer==''){
    responseData.code=1;
    responseData.message='问题答案不得为空！';
    res.json(responseData);
    return;
  }

  if(product==''){
    responseData.code=2;
    responseData.message='产品选择不得为空！';
    res.json(responseData);
    return;
  }

  if(responseData.code==0){
    Answer.findOne({
      _id: id
    }).then(function (rs) {
      if(!rs) {
        responseData.code = 3;
        responseData.message = '该答案ID不存在！';
        res.json(responseData);
        return;
      }else{
        return Answer.update({
          _id: id
        },{
          answer: req.body.answer,
          product: req.body.product
        })
      }
    }).then(function(){
      responseData.code=0;
      responseData.message='答案修改成功';
      res.json(responseData);
      return;
    })
  }
});

router.post('/answer_delete',function(req,res,next){
  var id=req.body.id;

  Answer.remove({
    _id:id
  }).then(function(){
    responseData.code=0;
    responseData.message='答案删除成功! ';
    res.json(responseData);
    return;
  })
});

router.post('/answer',function (req,res,next) {
  var answer=req.body.answer;

  Answer.find({answer: answer}).populate({
    path: 'product',
    populate: {path: 'category'}
  }).then(function (rs) {
    if(!rs||rs==''){
      responseData.code=1
    }else{
      responseData.code=0;
      responseData.data=rs;
    }
    res.json(responseData);
  })
});

module.exports = router;