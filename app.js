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

app.use('/product',require('./routers/product'));
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