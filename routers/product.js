const express = require('express');
const router = express.Router();

router.get('/', function(req,res,next){
  res.render('main/products');
});

router.get('/detail', function(req,res,next){
  res.render('main/detail');
});

module.exports = router;