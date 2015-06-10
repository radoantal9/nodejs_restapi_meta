'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
  var leaderboard = require('../../app/controllers/leaderboard');

	// Leaderboard Routes
	app.route('/leaderboard')
		// .get(users.requiresLogin, tags.list)
    .get(leaderboard.highest);
		// .post(users.requiresLogin, tags.create);
  
};