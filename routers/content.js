var express = require('express');
var router = express.Router();

var Content = require('../models/content');

var responseData=null;
router.use(function(req,res,next){
  responseData={
    code:0,
    message:''
  };
  next();
});

router.post('/content_save',function(req,res,next){
  var title=req.body.title;
  var content=req.body.content;

  Content.findOne({
      title:title
  }).then(function(rs){
    if(rs){
      return Content.update({
        title: title
      },{
        content: content
      })
    }else{
      return new Content({
        title: title,
        content: content
      }).save();
    }
  }).then(function(){
    responseData.code=0;
    responseData.message='文章保存成功! ';
    res.json(responseData);
    return;
  });
});

module.exports = router;