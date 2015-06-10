'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	var coupons = require('../../app/controllers/coupons');
	var users = require('../../app/controllers/users');
	var plays = require('../../app/controllers/plays');
/*
	var points = require('../../app/controllers/points');
  
  app.route('/points/award')
    .post(points.award);
*/
	app.route('/coupons')
		.get(coupons.available);
		
	app.route('/coupons/:coupon')
		//.post(users.requiresLogin, plays.hasAuthorization, coupons.claim);
		.put(users.requiresLogin, coupons.claim);
};
