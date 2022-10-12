var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var upload = require('express-fileupload')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var indexRouter = require('./routes/index');
var secureRouter = require('./routes/secure-pages');
var usersRouter = require('./routes/users');
var apiUser = require('./routes/apiUser');
var apiDocument = require('./routes/apiDocument');
var session = require('cookie-session')

// cd customer-app-node
// npm install core
// in app.js
var cors = require('cors');
var app = express();
app.use(cors());
app.use(upload({
  limits: {
      fileSize: 25000000 //25mb
  },
  abortOnLimit: true
}));
// app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/*+json' }))
// app.use(urlencodedParser);
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use("/uploads", express.static("uploads"));

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
app.use('/document', apiDocument);//security
app.use('/api/admin/document', apiDocument);//security

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
