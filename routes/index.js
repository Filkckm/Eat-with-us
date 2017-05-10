var express       = require('express');
var router        = express.Router();
var $             = require('jQuery');
const User        = require('../models/user');
const passport    = require("../helpers/passport");
const auth        = require('../helpers/auth');
// set up bcrypt
const bcrypt      = require('bcrypt');
const bcryptSalt  = 10;
const ensureLogin = require("connect-ensure-login");

/* GET home page. */
router.get('/', function(req, res, next) {
let user = req.user;
console.log('this is the NEW user',user);
    res.render("index" , {user});
});

module.exports = router;
