const express = require('express');
const app = express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const Cookies=require('cookies');
const swig=require('swig');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/public',express.static(__dirname+'/public'));

app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');
swig.setDefaults({cache:false});

app.use(function(req,res,next){
  req.cookies=new Cookies(req,res);

  if(req.cookies.get('userInfo')){
    try {
      req.userInfo=JSON.parse(req.cookies.get('userInfo'));
      User.findById(req.userInfo._id).then(function(userInfo){
        req.userInfo.isAdmin=Boolean(userInfo.isAdmin);
        next();
      });
    }catch(e){
      next();
    }
  }else {
    next();
  }
});

app.use('/product',require('./routers/product'));
app.use('/news',require('./routers/news'));
app.use('/content',require('./routers/content'));
app.use('/question',require('./routers/question'));
app.use('/user',require('./routers/user'));
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/jrf', {useMongoClient:true}, function(err){
  if(err){
    console.log('mongodb connect failed!');
  }else{
    console.log('mongodb connect success!');
    app.listen(3000);
  }
});