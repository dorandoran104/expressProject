var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var adminIndexRouter = require('./routes/admin/index');
var adminEmployeeRouter = require("./routes/admin/employee");
var adminGoodsRouter = require('./routes/admin/goods');
const adminCategoryRouter = require('./routes/admin/category');

var homeRouter = require('./routes/user/home');
var productRouter = require('./routes/user/product');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminIndexRouter);
app.use("/admin/employee",adminEmployeeRouter);
app.use('/admin/goods',adminGoodsRouter);
app.use('/admin/category',adminCategoryRouter);

app.use('/',homeRouter);
app.use('/product',productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('admin/404')
  // next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('home/error',{httpStatus : err.status || 500});
// });

module.exports = app;
