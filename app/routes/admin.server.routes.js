'use strict';

module.exports = function(app) {
	
  var admin = require('../../app/controllers/admin');
  var users = require('../../app/controllers/users');
  
  app.route('/admin')
    // .get(users.isAdmin, admin.panel)
    .get(users.requiresLogin, admin.hasAuthorization, admin.panel)
  
  app.route('/admin/toggle/:id')
    .post(users.requiresLogin, admin.hasAuthorization, admin.toggle)
  
};