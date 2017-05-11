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

  // console.log(req.session.passport.user._id);
  let userId = req.session.passport.user._id;
  let user   = req.user;

  User.findById(userId, (err, user) => {
    if (err) { next(err); }
    res.render('partys/new', { user: user });
  });
});




//crate new party://
///model details here///
router.post('/new', auth.checkLoggedIn('You must be login', '/login'), (req, res, next)=>{
  let userId = req.session.passport.user._id;
  let userName= req.session.passport.user.username;
  let user   = req.user;

  var party = new Party();


    party.partyName=              req.body.name;
    party.partyLocation=           req.body.locationName;
    party.partyDate=               req.body.date;
    party.partyTime=               req.body.time;
    party.partyType=               req.body.type;
    party.partyGuests=             req.body.guests;
    party.vegetarian=              req.body.vegetarian;
    party.partyPrice=              req.body.price;
    party.partyHost=               userName;
    party.partyDescription=        req.body.description;
    party.location.type=           'Point';
    party.location.coordinates =   [req.body.long, req.body.lat];
    // party.save((error) => {
    // 		  		if (error) {
    // 		  			next(error);
    // 		  		}
    // 		  	});

    Party.create(party, (err, doc)=>{
    if (err) {
      next(err);
    } else {
      Party.findOne(user)
            .populate('partys')
            .exec(function (err, user) {
              if (err) {
                next(err);
              } else {
                req.user.partys.push(party);
                let partyArray = req.user.partys;
                //I can update the user, for example the username, but not the partys array///
                User.findByIdAndUpdate(req.session.passport.user._id, {$set:{"partys":partyArray}},{new: true},function(err, user){
                  if(err){
                    console.log("Something went wrong when updating data!");
                  } else{
                    console.log("worked, probably", user);
                  }
                });
                res.redirect('/profile');
                console.log("worked");
              }
              });

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
