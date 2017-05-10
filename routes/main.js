var express   = require('express');
var router    = express.Router();
var auth      = require('../helpers/auth');
var $         = require('jQuery');
const User    = require('../models/user');
/* GET home page. */
router.get('/main', auth.checkLoggedIn('You must be logged in', '/login'), function(req, res, next) {

  const lat =req.query.lat;
  const lng= req.query.lng;

  res.render('main', { user: JSON.stringify(req.user), lat:lat, lng:lng } );
});
// router.get('/admin', auth.checkLoggedIn('You must be login', '/login'), auth.checkCredentials('ADMIN'), function(req, res, next) {
//  // console.log(req.user);
//   res.render('admin', { user: JSON.stringify(req.user) });
// });
module.exports = router;
