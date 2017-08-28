const express = require('express');
const app = express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
//const Cookies=require('cookies');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const swig=require('swig');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/public',express.static(__dirname+'/public'));

app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');
swig.setDefaults({cache:false});

app.use(session({
  secret: 'kxcf',
  name: 'userInfo',
  cookie: { maxAge: 60 * 60 * 1000 },

  store: new MongoStore({
    url: 'mongodb://kxcf:kxcfkxcf@localhost:27017/jrf'
  }),

  resave: false,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  var url = req.baseUrl+req.path;
  if(!req.session.user && url !== "/" && url !== "/login" && url !== "/product" && url !== "/product/product_detail" && url !== "/news" && url !== "/news/news_detail" && url !== "/adviser" && url !== "/about" && url !== "/404" && url !== "/505" && url !== "/user/register" && url !== "/user/registerCheck" && url !== "/user/login" && url !== "/user/user_save" && url !== "/question/answer"){
    return res.redirect("/");
  }
  next();
});

/*app.use(function(req,res,next){
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
});*/

app.use('/product',require('./routers/product'));
app.use('/news',require('./routers/news'));
app.use('/content',require('./routers/content'));
app.use('/question',require('./routers/question'));
app.use('/user',require('./routers/user'));
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://kxcf:kxcfkxcf@localhost:27017/jrf', {useMongoClient:true}, function(err){
  if(err){
    console.log('mongodb connect failed!');
  }else{
    console.log('mongodb connect success!');
    app.listen(3000);
  }
});