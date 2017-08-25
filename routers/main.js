const express = require('express');
const router = express.Router();

/*  router for main page  */

const Content = require('../models/content');
renderAdminTable(Content,'about',12);

const Slide = require('../models/slide');
const News = require('../models/news');
const Question = require('../models/question');
const Category = require('../models/category');

router.get('/', function(req,res,next){
  Slide.find().populate(['product']).then(function (slide) {
    News.find().populate(['category']).then(function (news) {
      Category.find({sort:'news'}).then(function (newsCategory) {
        res.render('main/index',{
          userInfo: req.session.user,
          slide: slide,
          news: news,
          newsCategory: newsCategory
        })
      })
    })
  })
});

router.get('/404', function(req,res,next){
  res.render('main/404',{
    userInfo: req.session.user
  })
});

router.get('/500', function(req,res,next){
  res.render('main/500',{
    userInfo:req.session.user
  })
});

router.get('/adviser', function(req,res,next){
  Question.find().then(function (question) {
    res.render('main/adviser',{
      userInfo: req.session.user,
      data: question
    })
  })
});

router.get('/login', function(req,res,next){
  res.render('main/login',{
    userInfo:req.session.user
  });
});

router.get('/admin', function(req,res,next){
  res.render('admin/index',{
    userInfo:req.session.user
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
        //console.log(data);
        res.render('main/'+type,{
          type:type,
          userInfo:req.session.user,
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