var $ = require('jQuery');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require("passport");


// set up bcrypt
const bcrypt = require('bcrypt');
const bcryptSalt     = 10;
const ensureLogin = require("connect-ensure-login");

/* GET users listing. */
//shows users
router.get('/', (req, res, next) => {
  User.find({}, (error, users)=>{
    if (error) {
      next(error);
    } else {
      res.render('users/index', { users } );
    }
  });
});

router.get('/:userId/edit', (req, res, next) => {
  User.findById(req.params.userId, (err, user)=>{
    if (err) {
      next(err);
    } else {
        res.render('users/edit', { user: user });
    }
  });
});

// router.post('/:id/update', (req, res, next) => {

router.get('/:userId/delete', (req, res, next) => {
  User.findByIdAndRemove(req.params.userId, (err, user)=>{
    if (err) {
      next(err);
    } else {
      res.redirect('/');
    }
  });
});

router.get('/profile', ensureLogin.ensureLoggedIn(), (req, res, next)=> {
  let userId = req.params.userId;
  let user = req.session.passport.user;

  User.findById(userId, (err, user) => {
    if (err) {
      next(err);
    } else {
      res.render('users/show', user );
    }
  });
});


module.exports = router;
