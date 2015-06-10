'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...

	var points = require('../../app/controllers/points');
  
  app.route('/points/award')
    .post(points.award);
  
};