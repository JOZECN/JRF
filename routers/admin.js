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

router.get('/product_list', function(req,res,next){
  res.render('admin/product_list');
});

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

module.exports = router;