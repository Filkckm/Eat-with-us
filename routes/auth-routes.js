const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require("../helpers/passport");
var $ = require('jQuery');
// set up bcrypt
const bcrypt = require('bcrypt');
const bcryptSalt     = 10;
const ensureLogin = require("connect-ensure-login");
// show form to signup
router.get('/signup', function(req, res, next) {
  res.render('auth/signup', { "message": req.flash("error") });
});
//post method to deal with users
//process form signup
router.post('/signup', (req, res, next) => {
  const username    = req.body.username;
  const password    = req.body.password;
  const address     = req.body.locationName;
  console.log('this is address: ',address);
  if (username === "" || password === "" || address === "") {
    req.flash('error', 'Indicate all information' );
    res.render("auth/signup", { "message": req.flash("error") });
    return;
  }
  User.findOne( {username }, "username", (err, user) => {
    if (user !== null) {
      req.flash('error', 'The username already exists' );
      res.render("auth/signup", { message: req.flash("error") });
      return;
    }
    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);
    console.log('username: ', username);
    console.log('password: ', hashPass);
    var newUser  = User({
      username,
      password: hashPass,
      address
    });
    newUser.save((err) => {
      if (err) {
        req.flash('error', 'The username already exists' );
        res.render("auth/signup", { message: req.flash('error') });
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect('/');
        });
      }
    });
  });
});
/////////LOGIN PAGE ROUTE/////////
//render login page
router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});
router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));
//logout and end session
router.get('/logout', (req, res) => {
  req.logout();
  delete res.locals.currentUser;
  delete req.session.passport;
  res.redirect('/');
});
router.get("/auth/facebook",          passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/login"
}));
//render private page if logged in//
router.get("/private", ensureLogin.ensureLoggedIn(), (req, res) => {
console.log(req.session.currentUser);
  let user= req.session.passport.user;
  res.render("private", {user});
});
module.exports = router;
