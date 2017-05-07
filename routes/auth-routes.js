var $ = require('jQuery');
const express = require('express');
const router = express.Router();


const User = require('../models/user');

// set up bcrypt
const bcrypt = require('bcrypt');
const bcryptSalt     = 10;


// show form to signup
router.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});

//post method to deal with users
//process form signup

router.post('/signup', (req,res,next)=>{
  const username    = req.body.username;
  const password    = req.body.password;
  const address     = req.body.locationName;

  if (username === "" || password === "" || address === "") {
      res.render("auth/signup", {
        errorMessage: "Indicate all information to sign up"
      });
      return;
    }
    User.findOne( {username: username}, (err, user) =>{
    if (user !== null) {
      res.render("auth/signup", {
        errorMessage: "The username already exists"
      });
      return;
    }
    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    console.log('username: ', username);
    console.log('password: ', hashPass);



    var newUser  = new User({
      username: username,
      password: hashPass,
      address : address

    });

    newUser.save((err) => {
      console.log('save');
      res.redirect('/');
    });
  });
});

/////////LOGIN PAGE ROUTE/////////
//render login page
router.get('/login', (req, res, next)=>{
  res.render('auth/login');
});

//actual login
router.post('/login' ,(req, res, next)=> {
  var username = req.body.username;
  var password = req.body.password;

  if(username==="" || password ==="") {
    res.render("auth/login", {
      errorMessage:"Indicate a username and a password to sign up"
    });
    return;
  }User.findOne({ "username": username }, (err, user) => {
      if (err || !user) {
        res.render("auth/login", {
          errorMessage: "The username doesn't exist"
        });
        return;
      }

      if (bcrypt.compareSync(password, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.render("main", {user});
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect password"
        });
      }
  });
});

//logout and end session
router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/login");
  });
});





module.exports = router;
