var $ = require('jQuery');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require("passport");


// set up bcrypt
const bcrypt = require('bcrypt');
const bcryptSalt     = 10;
const ensureLogin = require("connect-ensure-login");
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index' );
});
module.exports = router;
