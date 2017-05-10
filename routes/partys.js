var express     = require('express');
var router      = express.Router();
var $           = require('jQuery');
var auth        = require('../helpers/auth');
const Party     = require('../models/party');
const User      = require('../models/user');


//list all partys//
router.get('/', (req, res, next) => {
  let user  = req.user;
  const lat =req.query.lat;
  const lng = req.query.lng;
  console.log(user);
  console.log(lat, lng);

  Party.find({}, (error, partys)=>{
    if (error) {
      next(error);
    } else {
      res.render('partys/index', { partys, user: JSON.stringify(req.user), lat:lat, lng:lng } );
    }
  });
});
//crate new party://

router.get('/new', auth.checkLoggedIn('You must be login', '/login'), (req, res, next) => {
  console.log("ggfdjgkdjgk");
  console.log(req.session.passport.user._id);
  let userId = req.session.passport.user._id;
  let user   = req.user;
console.log('partys current userId:', userId);
console.log('partys current user:', user);

  User.findById(userId, (err, user) => {
    if (err) { next(err); }
    res.render('partys/new', { user: user });
  });
});




//crate new party://
///model details here///
router.post('/new', auth.checkLoggedIn('You must be login', '/login'), (req, res, next)=>{
  console.log("fgdhjfgjshdfg");
  let userId = req.session.passport.user._id;
  let user   = req.user;
  let party = {
    partyName:        req.body.name,
    partyLocation:    req.body.locationName,
    partyDate:        req.body.date,
    partyTime:        req.body.time,
    partyType:        req.body.type,
    partyGuests:      req.body.guests,
    vegetarian:       req.body.vegetarian,
    partyPrice:       req.body.price,
    partyHost_id:     userId,
    partyDescription: req.body.description,
  };
    Party.create(party, (err, doc)=>{
    if (err) {
      next(err);
    } else {
      console.log("newpartyyyyyy", party);
      res.redirect('/');
    }
  });
});

//show form to add new party
// router.get('/new', (req, res) => {
//   res.render('partys/new');
// });

router.get('/:id/edit', (req, res, next) => {
  Party.findById(req.params.id, (err, party)=>{
    if (err) {
      next(err);
    } else {
        res.render('partys/edit', { party: party });
    }
  });
});

//update a certain party//
router.post('/:id/update', (req, res, next) => {
  let partyToUpdate = {
    partyName:        req.body.name,
    partyLocation:    req.body.locationName,
    partyDate:        req.body.date,
    partyTime:        req.body.time,
    partyType:        req.body.type,
    partyGuests:      req.body.guests,
    vegetarian:       req.body.vegetarian,
    partyPrice:       req.body.price,
    partyDescription: req.body.description,
  };
  Party.findByIdAndUpdate(req.params.id, partyToUpdate, (err, party)=>{
    if (err) {
      next(err);
    } else {
      res.redirect('/partys');
    }
  });
});
//delete a certain party//
router.get('/:id/delete', (req, res, next) => {
  Party.findByIdAndRemove(req.params.id, (err, party)=>{
    if (err) {
      next(err);
    } else {
      res.redirect('/partys');
    }
  });
});

//show a certain party//
router.get('/:partyId', (req, res, next)=> {
  let partyId = req.params.partyId;

  Party.findById(partyId, (err, party) => {
    if (err) {
      next(err);
    } else {
      res.render('partys/show', party );
    }
  });
});

module.exports = router;
