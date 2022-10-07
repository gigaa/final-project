var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var secureRouter = require('./routes/secure-pages');
var usersRouter = require('./routes/users');
var apiUser = require('./routes/apiUser');
var apiPerson = require('./routes/apiPerson');
var session = require('cookie-session')

// cd customer-app-node
// npm install core
// in app.js
var cors = require('cors');
var app = express();
app.use(cors());
// const url = 'mongodb://udbgsu2v2gmoido3o49u:7Fw7CjDmyvJkEMcV5WSa@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/b0csomwptm1n3ow?replicaSet=rs0';

// mongoose.connect(url,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() =>{
//   console.log('DB Connected');
// })

var sess = {
  name:'customerapp2',
  secret: 'keyboard cat',
  cookie: {},
  proxy: true,
  resave: true,
  saveUninitialized: true
}
app.use(session(sess));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// checkpoint
// app.use(function(req,res,next){
//   if(req.session.user && req.session.user.length > 2 ){
//     next();
//   }else{
//     res.redirect('/login')
//   }
// })

app.use('/', secureRouter); //security
app.use('/api/admin', apiUser);//security
app.use('/api/person', apiPerson);//security

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
