const express = require('express');
const router = express.Router();

var responseData=null;
router.use(function(req,res,next){
  responseData={
    code:0,
    message:''
  };
  next();
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

const Question=require('../models/question');
const Answer=require('../models/answer');

const User=require('../models/user');
renderAdminTable(User,'user_list',10);

const Category=require('../models/category');
renderAdminTable(Category,'product_category_list',100);
renderAdminTable(Category,'news_category_list',100);

const Product = require('../models/product');
renderAdminTable(Product,'product_list',10000,['category','user']);

const News = require('../models/news');
renderAdminTable(News,'news_list',10000,['category','user']);

const Slide = require('../models/slide');
renderAdminTable(Slide,'slide_config',10,['product']);

const Content = require('../models/content');
renderAdminTable(Content,'about_us',3);
renderAdminTable(Content,'about_site',3);
renderAdminTable(Content,'user_agreement',3);
renderAdminTable(Content,'faq',3);

/*  router for admin page   */

router.get('/', function(req,res,next){
  res.render('admin/index',{
    userInfo:req.session.user
  });
});

router.get('/product_add', function(req,res,next){
  Category.find({'sort': 'product'}).then(function(category){
    res.render('admin/product_add',{
      userInfo:req.session.user,
      category:category
    });
  })
});

router.get('/product_category_add', function(req,res,next){
  res.render('admin/product_category_add',{
    userInfo:req.session.user
  });
});

router.get('/product_category_edit', function(req,res,next){
  var id=req.query.id;

  Category.findOne({
    _id:id
  }).then(function(rs){
    if(!rs){
      res.render('admin/404',{
        userInfo:req.session.user,
        message:'该分类id已被删除了。'
      });
      return;
    }else{
      res.render('admin/product_category_edit',{
        userInfo:req.session.user,
        data: rs
      });
    }
  })
});

router.get('/news_add', function(req,res,next){
  Category.find({'sort': 'news'}).then(function(category){
    res.render('admin/news_add',{
      userInfo:req.session.user,
      category:category
    });
  })
});

router.get('/news_category_add', function(req,res,next){
  res.render('admin/news_category_add',{
    userInfo:req.session.user
  });
});

router.get('/news_category_edit', function(req,res,next){
  var id=req.query.id;

  Category.findOne({
    _id:id
  }).then(function(rs){
    if(!rs){
      res.render('admin/404',{
        userInfo:req.session.user,
        message:'该分类id已被删除了。'
      });
      return;
    }else{
      res.render('admin/news_category_edit',{
        userInfo:req.session.user,
        data: rs
      });
    }
  })
});

router.get('/question_list',function(req,res,next){
  var data={
    userInfo:req.session.user
  };

  Question.find().then(function(question){
    data.question = question;
  }).then(function () {
    Answer.find().populate(['product']).then(function (answer) {
      data.answer = answer;
    }).then(function () {
      console.log(data);
      res.render('admin/question_list', data);
    })
  })
});

router.get('/question_add', function(req,res,next){
  res.render('admin/question_add',{
    userInfo:req.session.user
  });
});

router.get('/question_edit', function(req,res,next){
  var id=req.query.id;

  Question.findOne({
    _id:id
  }).then(function(rs){
    if(!rs){
      res.render('admin/404',{
        userInfo:req.session.user,
        message:'该问题id已被删除了。'
      });
      return;
    }else{
      res.render('admin/question_edit',{
        userInfo:req.session.user,
        data: rs
      });
    }
  })
});

router.get('/answer_add', function(req,res,next){
  Product.find().then(function(product){
    res.render('admin/answer_add',{
      userInfo: req.session.user,
      product: product
    })
  })
});

router.get('/answer_edit', function(req,res,next){
  var id=req.query.id;

  Answer.findOne({
    _id: id
  }).then(function(rs){
    if(!rs){
      res.render('admin/404',{
        userInfo:req.session.user,
        message:'该答案id已被删除了。'
      });
      return;
    }else {
      Product.find().then(function (product) {
        res.render('admin/answer_edit', {
          userInfo: req.session.user,
          product: product,
          data: rs
        })
      })
    }
  })
});

/*  function for admin data  */

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

      if(type=='about_us'){
        var newObj = _query ? obj.find({"$or":[{"title":"about_company"},{"title":"contact_us"},{"title":"join_us"}]}).sort({_id: -1}).limit(limit).skip(skip).populate(_query) : obj.find({"$or":[{"title":"about_company"},{"title":"contact_us"},{"title":"join_us"}]}).sort({_id: -1}).limit(limit).skip(skip);
      }else if(type=='about_site'){
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
        res.render('admin/'+type,{
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

router.post('/category_add',function(req,res,next){
  var name=req.body.name;
  var description=req.body.description;
  var sort=req.body.sort;

  if(name==''){
    responseData.code=1;
    responseData.message='分类名不能为空！';
    res.json(responseData);
    return;
  }

  if(description==''){
    responseData.code=2;
    responseData.message='分类描述不能为空！';
    res.json(responseData);
    return;
  }

  Category.findOne({
    name:name
  }).then(function(rs){
    if(rs){
      responseData.code=3;
      responseData.message='分类已存在！';
      res.json(responseData);
      return;
    }else{
      new Category({
        name: name,
        description: description,
        sort: sort
      }).save().then(function () {
        responseData.code=0;
        responseData.message='添加成功！';
        res.json(responseData);
        return;
      });
    }
  })
});

router.post('/category_edit',function(req,res,next){
  var id=req.body.id;
  var name=req.body.name;
  var description=req.body.description;
  var sort=req.body.sort;

  if(name==''){
    responseData.code = 1;
    responseData.message ='分类名不能为空！';
    res.json(responseData);
    return;
  }

  if(description==''){
    responseData.code = 2;
    responseData.message ='分类描述不能为空！';
    res.json(responseData);
    return;
  }

  Category.findOne({
    _id:id
  }).then(function(rs) {
    if (!rs) {
      responseData.code = 3;
      responseData.message = '该分类ID不存在！';
      res.json(responseData);
      return;
    } else {
      return Category.update({
        _id: id
      }, {
        name: name,
        description: description,
        sort: sort
      });
    }
  }).then(function () {
    responseData.code = 0;
    responseData.message='分类修改成功！';
    res.json(responseData);
    return;
  })
});

router.post('/category_delete',function(req,res,next){
  var id=req.body.id;

  Category.remove({
    _id:id
  }).then(function(){
    responseData.code=0;
    responseData.message='分类删除成功! ';
    res.json(responseData);
    return;
  });
});

router.get('/product_edit', function(req,res,next){
  var id=req.query.id;

  Product.findOne({
    _id:id
  }).then(function(rs){
    if(!rs){
      res.render('admin/404',{
        userInfo:req.session.user,
        message:'该产品ID已被删除！'
      });
      return;
    }else{
      Category.find().then(function(category){
        res.render('admin/product_edit',{
          userInfo:req.session.user,
          category:category,
          data: rs
        });
      })
    }
  })
});

router.get('/news_edit', function(req,res,next){
  var id=req.query.id;

  News.findOne({
    _id:id
  }).then(function(rs){
    if(!rs){
      res.render('admin/404',{
        userInfo:req.session.user,
        message:'该资讯ID已被删除！'
      });
      return;
    }else{
      Category.find().then(function(category){
        res.render('admin/news_edit',{
          userInfo:req.session.user,
          category:category,
          data: rs
        });
      })
    }
  })
});

router.get('/slide_config_add', function(req,res,next){
  Product.find().then(function(product){
    res.render('admin/slide_config_add',{
      userInfo: req.session.user,
      product: product
    })
  })
});

router.get('/slide_config_edit', function(req,res,next){
  var id=req.query.id;

  Slide.findOne({
    _id:id
  }).then(function(rs){
    if(!rs){
      res.render('admin/404',{
        userInfo:req.session.user,
        message:'该轮播id已被删除了。'
      });
      return;
    }else{
      Product.find().then(function(product){
        res.render('admin/slide_config_edit',{
          userInfo: req.session.user,
          product: product,
          data: rs
        })
      })
    }
  })
});

var formidable = require('formidable');
router.post('/uploadImg', function(req, res, next) {
  var info = {
    error: 0,
    url: ''
  };

  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = __dirname + '/../public/upload/image';
  form.parse(req, function (err, fields, files) {
    if (err) {
      throw err;
    }
    var image = files.file;
    if(image.size>1024*512){
      info.error=1;
    }else {
      var path = image.path;
      path = path.replace('/\\/g', '/');
      info.url = '/../public/upload/image' + path.substr(path.lastIndexOf('/'), path.length);
      info.error=0;
    }
    res.send(info);
  })
});

module.exports = router;