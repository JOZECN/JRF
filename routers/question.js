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

const Question=require('../models/question');
const Answer=require('../models/answer');



module.exports = router;