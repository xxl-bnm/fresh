var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');//跨域
var proxy =require('http-proxy-middleware');
//存储
var session =require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//挂载对象上，在路由之前,代表给整个app开启跨域权限，保证每个接口都允许被访问
app.use(cors());
//给定访问网络的路径的后半部分,,loaclhost指向前半部分
app.use('/herolist.json',proxy({target:'http://host810267499.s360.pppf.com.cn',changeOrigin:true}))
app.use(session({ 
    secret: 'recommend 128 bytes random string', 
    cookie: { maxAge: 20 * 60 * 1000 },//不重启服务，保持20分钟
    resave: true,
    saveUnintialized: true
}))


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
