var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
//shows users
router.get('/', (req, res, next) => {
  let user = req.user;
  User.find({}, (error, users)=>{
    if (error) {
      next(error);
    } else {
      res.render('users/index', { users, user:JSON.stringify(req.user) } );
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

router.get('/:userId', (req, res, next)=> {
  let userId = req.params.userId;

  User.findById(userId, (err, product) => {
    if (err) {
      next(err);
    } else {
      res.render('users/show', product ,{users,});
    }
  });
});


module.exports = router;

///////////
var express         = require('express');
var router          = express.Router();

const ensureLogin   = require('connect-ensure-login');
const passport      = require('passport');
var auth            = require('../helpers/auth');
/* GET users listing. */
//shows users
router.get('/', (req, res, next) => {
  User.find({}, (error, users)=>{
    if (error) {
      next(error);
    } else {
      console.log(users);
      res.render('users/index',{ users, user:JSON.stringify(req.user) } );
    }
  });
});



//edit user profile  start*//
router.get('/profile/edit', auth.checkLoggedIn('You must be login', '/login'), (req, res, next)=> {
  console.log(req.session.passport.user._id);
  let userId = req.session.passport.user._id;
  User.findById(userId, (err, user) => {
    if (err) {
      next(err);
    } else {
      console.log('this is the profile user:',user);
      res.render('users/edit', {user:user} );
    }
  });
});

router.post('/profile/edit', auth.checkLoggedIn('You must be login', '/login'), (req, res, next) => {
  console.log(req.session.passport.user._id);
  let userId = req.session.passport.user._id;
  let userToUpdate = {
    username:        req.body.username,
    address:          req.body.address,
    description:      req.body.description,

  };
  User.findByIdAndUpdate(userId, userToUpdate, (err, user)=>{
    if (err) {
      next(err);
    } else {
      res.redirect('/profile');
    }
  });
});
//edit user profile  end*//

//delete user profile start*//
router.get('/profile/delete', (req, res, next) => {
  User.findByIdAndRemove(userId, (err, user)=>{
    if (err) {
      next(err);
    } else {
      res.redirect('/');
    }
  });
});
//delete user profile end*//

//show user profile start*///
router.get('/profile', auth.checkLoggedIn('You must be login', '/login'), (req, res, next)=> {
  let userId = req.session.passport.user._id;
  User.findById(userId, (err, user) => {
    if (err) {
      next(err);
    } else {
      res.render('users/show', { user } );
    }
  });
});
//show user profile end*///

module.exports = router;
