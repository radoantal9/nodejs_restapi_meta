'use strict';

var _ = require('lodash'),
	Promise = require('promise'),
	mongoose = require('mongoose'),
	errorHandler = require('./errors'),
    moment = require('moment'),
	Coupon = mongoose.model('Coupon'),
	nodemailer = require('nodemailer'),
	config = require('../../config/config'),
	_ = require('lodash');

exports.available = function(req, res) {

	var requestCouponAvailability = new Promise(function (resolve, reject) {
		// FIND NEXT (POSSIBLY) AVAILABLE COUPON (TIME-WISE)
		Coupon.findOne({
				'available': true,
				'time': {
					'$lte': new Date()
				}
			}, 'time available claimed')
			.sort({'time': -1})
			.exec(function(err, coupons){
				if (err) {
					reject(err);
				} else {
					resolve(coupons);
				}
			});
	});

	// res.send(false);
	requestCouponAvailability.then(
		function(result){
			res.json(result);
		}, 
		function(err){
			console.log(err);
		}
	);


};

exports.claim = function(req, res) {
	console.log('CLAIM COUPON req.body: ', req.body);
	var coupon = req.body;
	Coupon.findOne({
			'_id': coupon.id
		})
		.exec(function(err, result){
			if (err) {
				console.log('Coupon claim failed.', err);
				res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				result.available = false;
				result.claimed = true;
				result.claimTime = new Date();
				result.user = req.user;
				result.play = coupon.play;
				//console.log('req.user', req.user);
				//console.log('req.play', req.play);

				result.save(function(err) {
					if (err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						res.jsonp({'claimed': true});
						console.log('Coupon claim retrieved.', result);						
						// send email to user
						
						var smtpTransport = nodemailer.createTransport('SMTP', {
							service: 'Gmail',
							auth: {
							  user: config.gmail.address,
							  pass: config.gmail.password,
							}
						});
						var mailOptions = {
							to: req.user.email,
							from: 'game@demo.com',
							subject: 'MarcAngelo Game $1 coupon',
							text: 'You got new coupon.\n\n' +
							  'Date: ' + result.claimTime.toString() + '\n\n' +
							  'User Name: ' + req.user.displayName + '\n\n' +
							  'User Email: ' + req.user.email + '\n\n' +
							  'User Address: ' + req.user.street + ',' + req.user.city + '\n\n'
						};
						smtpTransport.sendMail(mailOptions, function(err) {							
						});
					}
				});

			}
		});
};
