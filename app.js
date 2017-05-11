
const expressLayouts = require('express-ejs-layouts');
const express        = require('express');
const path           = require('path');
const favicon        = require('serve-favicon');
const logger         = require('morgan');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');
const partys         = require('./routes/partys');
const Party          = require('./models/party');
const users          = require('./routes/users');
// const portDB         = require('./config').portDB;
// const databaseName   = require('./config').databaseName;
var $ = require('jQuery');
const flash          = require("connect-flash");
const auth           = require('./helpers/auth');
const User           = require('./models/user');
// const main           = require('./routes/main');
const profile        = require('./routes/users');
const index          = require('./routes/index');
const authRoute      = require('./routes/auth-routes');
var api = require('./routes/api');
var app = express();
mongoose.connect("mongodb://localhost:27017/eat-with-usDB");
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
// require user model
// view engine setup
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(auth.setCurrentUser);
//session//
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 6000000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));
app.use(flash());
const passport = require('./helpers/passport');
app.use(passport.initialize());
app.use(passport.session());
// adding our own middleware so all pages can access currentUser
app.use((req, res, next) => {
  res.locals.currentUser = req.User;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});
//routes
app.use('/api', api);
app.use('/', authRoute);
app.use('/', index);
// app.use('/', main);
app.use('/', profile);
app.use('/partys', partys);
app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
