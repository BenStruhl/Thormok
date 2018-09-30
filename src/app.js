var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient,
    Grid = MongoClient.Grid;
const url = 'mongodb://66.175.211.166/27017/test';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

MongoClient.connect(url, function(err, db) {
    if(err) return console.dir(err);

    var grid = new Grid(db, 'fs');
    var buffer = new Buffer("Hello world");
    grid.put(buffer, {metadata:{category:'text'}, content_type: 'text'}, function(err, fileInfo) {
        if(!err) {
            console.log("Finished writing file to Mongo");
        }
    });
});

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
