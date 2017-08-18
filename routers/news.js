const express = require('express');
const router = express.Router();

const News = require('../models/news');
const Category = require('../models/category');

/*  main  */

router.get('/', function(req,res,next){
  News.find().populate(['category','user']).limit(15).then(function (news) {
    Category.find({sort:'news'}).then(function (newsCategory) {
      res.render('main/news', {
        userInfo: req.userInfo,
        news: news,
        newsCategory: newsCategory
      })
    })
  })
});

router.get('/news_detail', function(req,res,next){
  var id=req.query.id;

  News.findOne({_id:id}).populate(['category','user']).then(function (rs) {
    rs.view++;
    rs.save();
    res.render('main/news_detail',{
      userInfo: req.userInfo,
      data: rs
    });
  })
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

router.post('/news_add',function(req,res,next){
  var title=req.body.title;
  var content=req.body.content;

  if(title==''){
    responseData.code=1;
    responseData.message='资讯名称不得为空！';
    res.json(responseData);
    return;
  }
  if(content==''){
    responseData.code=2;
    responseData.message='资讯内容不得为空！';
    res.json(responseData);
    return;
  }

  if(responseData.code==0){
    new News({
      title:req.body.title,
      category:req.body.category,
      content:req.body.content,
      date:new Date().toDateString(),
      user:req.body.user,
      view:0
    }).save().then(function(){
      responseData.code=0;
      responseData.message='资讯添加成功';
      res.json(responseData);
      return;
    });
  }
});

router.post('/news_edit',function(req,res,next){
  var id=req.body.id;
  var title=req.body.title;
  var content=req.body.content;

  if(title==''){
    responseData.code=1;
    responseData.message='资讯名称不得为空！';
    res.json(responseData);
    return;
  }
  if(content==''){
    responseData.code=2;
    responseData.message='资讯内容不得为空！';
    res.json(responseData);
    return;
  }

  if(responseData.code==0){
    News.findOne({
      _id: id
    }).then(function (rs) {
      if(!rs) {
        responseData.code = 3;
        responseData.message = '该资讯ID不存在！';
        res.json(responseData);
        return;
      }else{
        return News.update({
          _id: id
        },{
          title:req.body.title,
          category:req.body.category,
          content:req.body.content,
          date:new Date().toDateString(),
          user:req.body.user,
          view:Number(rs.view)
        })
      }
    }).then(function(){
      responseData.code=0;
      responseData.message='资讯修改成功';
      res.json(responseData);
      return;
    });
  }
});

router.post('/news_delete',function(req,res,next){
  var id=req.body.id;

  News.remove({
    _id:id
  }).then(function(){
    responseData.code=0;
    responseData.message='资讯删除成功! ';
    res.json(responseData);
    return;
  });
});

module.exports = router;