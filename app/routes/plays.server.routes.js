'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var plays = require('../../app/controllers/plays');

	// Plays Routes
	app.route('/plays')
		// .get(users.requiresLogin, plays.list)
		.post(users.requiresLogin, plays.create);

	app.route('/plays/:playId')
		// .get(users.requiresLogin, plays.read)
		.put(users.requiresLogin, plays.hasAuthorization, plays.update)
		// .delete(users.requiresLogin, plays.hasAuthorization, plays.delete);

	// Finish by binding the Play middleware
	app.param('playId', plays.playByID);
};
