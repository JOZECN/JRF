const express = require('express');
const router = express.Router();

router.get('/', function(req,res,next){
  res.send('JRF-admin');
});

module.exports = router;