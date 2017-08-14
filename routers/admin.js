const express = require('express');
const router = express.Router();

router.get('/', function(req,res,next){
  res.render('admin/index');
});

router.get('/404', function(req,res,next){
  res.render('admin/404');
});

router.get('/500', function(req,res,next){
  res.render('admin/500');
});

router.get('/basic_table', function(req,res,next){
  res.render('admin/basic_table');
});

router.get('/blank', function(req,res,next){
  res.render('admin/blank');
});

router.get('/buttons', function(req,res,next){
  res.render('admin/buttons');
});

router.get('/calendar', function(req,res,next){
  res.render('admin/calendar');
});

router.get('/charts', function(req,res,next){
  res.render('admin/charts');
});

router.get('/dynamic_table', function(req,res,next){
  res.render('admin/dynamic_table');
});

router.get('/font_awesome', function(req,res,next){
  res.render('admin/font_awesome');
});

router.get('/form_component', function(req,res,next){
  res.render('admin/form_component');
});

router.get('/form_validation', function(req,res,next){
  res.render('admin/form_validation');
});

router.get('/form_wizard', function(req,res,next){
  res.render('admin/form_wizard');
});

router.get('/general', function(req,res,next){
  res.render('admin/general');
});

router.get('/grids', function(req,res,next){
  res.render('admin/grids');
});

router.get('/inbox', function(req,res,next){
  res.render('admin/inbox');
});

router.get('/invoice', function(req,res,next){
  res.render('admin/invoice');
});

router.get('/layout', function(req,res,next){
  res.render('admin/layout');
});

router.get('/login', function(req,res,next){
  res.render('admin/login');
});

router.get('/profile', function(req,res,next){
  res.render('admin/profile');
});

router.get('/profile-activity', function(req,res,next){
  res.render('admin/profile-activity');
});

router.get('/profile-edit', function(req,res,next){
  res.render('admin/profile-edit');
});

router.get('/slider', function(req,res,next){
  res.render('admin/slider');
});

router.get('/widget', function(req,res,next){
  res.render('admin/widget');
});

/*  router for admin page   */

router.get('/product_add', function(req,res,next){
  res.render('admin/product_add');
});

router.get('/product_category', function(req,res,next){
  res.render('admin/product_category');
});

router.get('/category_add', function(req,res,next){
  res.render('admin/category_add');
});

router.get('/user_list', function(req,res,next){
  res.render('admin/user_list');
});

router.get('/questionnaire_list', function(req,res,next){
  res.render('admin/questionnaire_list');
});

router.get('/questionnaire_add', function(req,res,next){
  res.render('admin/questionnaire_add');
});

router.get('/about_us', function(req,res,next){
  res.render('admin/about_us');
});

router.get('/about_site', function(req,res,next){
  res.render('admin/about_site');
});

router.get('/user_agreement', function(req,res,next){
  res.render('admin/user_agreement');
});

router.get('/faq', function(req,res,next){
  res.render('admin/faq');
});

/*  function for admin data  */

const User=require('../models/user');
renderAdminTable(User,'user_list',10);

const Category=require('../models/category');
renderAdminTable(Category,'product_category',5);
renderAdminTable(Category,'news_category',5);

const Product = require('../models/product');
renderAdminTable(Product,'product_list',5);

const Content = require('../models/content');
renderAdminTable(Content,'about_us',20);
renderAdminTable(Content,'about_site',20);
renderAdminTable(Content,'user_agreement',20);
renderAdminTable(Content,'faq',20);

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

      var newObj = _query ? obj.find().sort({_id: -1}).limit(limit).skip(skip).populate(_query) : obj.find().sort({_id: -1}).limit(limit).skip(skip);

      newObj.then(function(data){
        res.render('admin/'+type,{
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

router.get('/about_us',function(req,res,next){
  var contentId=req.query.contentId||'';
  Content.findOne({
    _id:contentId
  }).then(function(content){
    responseData.data=content;
    res.json(responseData);
  })
});

module.exports = router;