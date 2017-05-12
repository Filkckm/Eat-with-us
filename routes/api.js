/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
var Party = require('../models/party');

router.route('/')
	.get((req, res) => {
	  Party.find((error, partys) => {
	  	if (error) {
	  		res.status(500).json({message: error});
	  	} else {
	  		res.status(200).json(partys);
	  	}
	  });
	});

router.route('/search')
	.get((req, res) => {
		var latitude = req.query.lat;
		var longitude = req.query.lng;
		var maxDistance = req.query.dis;
		Party.where('location')
							.near({ center: { coordinates: [longitude, latitude], type: 'Point' }, maxDistance: maxDistance })
							.find((error, partys) => {
								if (error) {
									res.status(500).json({message: error});
								} else {
									res.status(200).json(partys);
								}
							});
	});

router.route('/:party_id')
	.get((req, res) => {
		Party.findById(req.params.party_id, (error, party) => {
			if (error) {
				res.status(500).json({message: error});
			} else {
				res.status(200).json(party);
			}
		});
	});



module.exports = router;
