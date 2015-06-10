'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Play = mongoose.model('Play'),
	Promise = require('promise'),
	// Coupon = require('./coupons'),
	Coupon = mongoose.model('Coupon'),
	_ = require('lodash');

/**
 * Create a Play
 */
exports.create = function(req, res) {
	console.log(req.body);

	new Promise(function (resolve, reject) {
		Coupon.findOne({
			'available': true,
			'time': {
				'$lte': new Date() 
			}
		}, 'time available claimed')
		.sort({'time': -1})
		.exec(function(err, coupon){
			if (err) {
				reject(err);
			} else {
				resolve(coupon);
			}
		});
	})
	.then(function(coupon) {
		console.log('coupon', coupon);
		var data = req.body;
		data.user = req.user;
		data.name = req.user.displayName;
		data.coupon = coupon;
		var play = new Play(data);
		play.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(play);
			}
		});
	}, function(err) {
		console.log(err);
	});

};

/**
 * Show the current Play
 */
exports.read = function(req, res) {
	res.jsonp(req.play);
};

/**
 * Update a Play
 */
exports.update = function(req, res) {
	var play = req.play;

	console.log('play.finished', (play.finished === undefined) );
	console.log('play', play);

	if (play.finished === undefined) {

		play = _.extend(play , req.body);

		play.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(play);
				console.log(play.finished);
			}
		});

	} else {
		// SOMEONE JUST TRIED TO UPDATE THE CURRENT PLAY DATA BUT WE BLOCKED EM.
		console.log('GAME FINISHED. CANNOT UPDATE PLAY.')
		res.jsonp({"gameova": true});
	}
};

/**
 * Delete an Play
 */
// exports.delete = function(req, res) {
// 	var play = req.play ;
// 
// 	play.remove(function(err) {
// 		if (err) {
// 			return res.status(400).send({
// 				message: errorHandler.getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(play);
// 		}
// 	});
// };

/**
 * List of Plays
 */
exports.list = function(req, res) { Play.find().sort('-created').populate('user', 'displayName').exec(function(err, plays) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(plays);
		}
	});
};

/**
 * Play middleware
 */
exports.playByID = function(req, res, next, id) { Play.findById(id).populate('user', 'displayName').exec(function(err, play) {
		if (err) return next(err);
		if (! play) return next(new Error('Failed to load Play ' + id));
		req.play = play ;
		next();
	});
};

/**
 * Play authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.play.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
