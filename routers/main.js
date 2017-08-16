const express = require('express');
const router = express.Router();

/*  router for main page  */

const Content = require('../models/content');
renderAdminTable(Content,'about',12);

router.get('/', function(req,res,next){
  res.render('main/index',{
    userInfo:req.userInfo
  });
});

router.get('/adviser', function(req,res,next){
  res.render('main/adviser',{
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

function renderAdminTable(obj,type,limit,_query){
  router.get('/'+type+'/', function (req,res,next) {
    var page=req.query.page||1;
    var count=0;

    obj.count().then(function(_count){
      count=_count;
      var pages=Math.ceil(count/limit);
      page=Math.min(page,pages);
      page=Math.max(page,1);

      var skip=(page-1)*limit;

      if(type=='about_site'){
        var newObj = _query ? obj.find({"$or":[{"title":"about_site"},{"title":"site_theory"},{"title":"rate"}]}).sort({_id: -1}).limit(limit).skip(skip).populate(_query) : obj.find({"$or":[{"title":"about_site"},{"title":"site_theory"},{"title":"rate"}]}).sort({_id: -1}).limit(limit).skip(skip);
      }else if(type=='user_agreement'){
        var newObj = _query ? obj.find({"$or":[{"title":"regulation"},{"title":"protect"},{"title":"term"}]}).sort({_id: -1}).limit(limit).skip(skip).populate(_query) : obj.find({"$or":[{"title":"regulation"},{"title":"protect"},{"title":"term"}]}).sort({_id: -1}).limit(limit).skip(skip);
      }else if(type=='faq'){
        var newObj = _query ? obj.find({"$or":[{"title":"guide"},{"title":"investor"},{"title":"recharge"}]}).sort({_id: -1}).limit(limit).skip(skip).populate(_query) : obj.find({"$or":[{"title":"guide"},{"title":"investor"},{"title":"recharge"}]}).sort({_id: -1}).limit(limit).skip(skip);
      }else if (type=='product_category_list'){
        var newObj = _query ? obj.find({'sort': 'product'}).sort({_id: -1}).limit(limit).skip(skip).populate(_query) : obj.find({'sort': 'product'}).sort({_id: -1}).limit(limit).skip(skip);
      }else if (type=='news_category_list'){
        var newObj = _query ? obj.find({'sort': 'news'}).sort({_id: -1}).limit(limit).skip(skip).populate(_query) : obj.find({'sort': 'news'}).sort({_id: -1}).limit(limit).skip(skip);
      }else {
        var newObj = _query ? obj.find().sort({_id: -1}).limit(limit).skip(skip).populate(_query) : obj.find().sort({_id: -1}).limit(limit).skip(skip);
      }

      newObj.then(function(data){
        console.log(data);
        res.render('main/'+type,{
          type:type,
          userInfo:req.userInfo,
          data:data,
          page:page,
          pages:pages,
          limit:limit,
          count:count
        });
      });
    });
  });
}

module.exports = router;