var express = require('express');
var router = express.Router();
var $ = require('jQuery');
const User = require('../models/user');

/* GET home page. */
router.get('/main', function(req, res, next) {
  res.render('main' );
});

module.exports = router;
