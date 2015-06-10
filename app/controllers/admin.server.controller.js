'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    request = require('request-json'),
    Promise = require('promise'),
    _ = require('lodash'),
    config = require('../../config/config'),
    Tag = mongoose.model('Tag'),
    client = request.newClient(config.HASHTAG_SERVICE);

/**
 * Display Admin Panel
 */
exports.panel = function(req, res) {
  console.log(req.user.roles);
  // res.send('...');
  res.jsonp(req.user);
};

/**
 * Toggle Tag Visibility (Moderation)
 */
exports.toggle = function(req, res) {
  console.log('toggle id:', req.params);
  
  var getTag = new Promise(function(resolve, reject){
    client.get('tags/' + req.params.id, function (err, resp) {
      if (err) reject(err);
      else resolve(resp);
    });
  });
  
  getTag
    .then(function(resp){
      var tag = JSON.parse(resp.body);
      // console.log('tag', tag);
      console.log('tag.id', tag.id, 'tag.approved', tag.approved);
      
      return new Promise(function(resolve, reject){
        client.put('tags/' + tag.id, {"approved": !tag.approved}, function (err, resp) {
          if (err) reject(err);
          else resolve(resp);
        });
      });

      // console.log('TAG', tag.id, 'APPROVED', tag.approved);
      // res.json({'success': true});
    }, function(e){
      console.log('error fetching tag to toggle');
      // res.json({'success': false, 'error': JSON.parse(e)});
    })
    .then(function(resp){
      console.log('...tried putting');
      console.log(resp);
      res.json({'success': true});
    }, function(e){
      console.log('error fetching tag to toggle');
      res.json({'success': false, 'error': JSON.parse(e)});
    })
  
  // res.json({'success': true});
  // res.send('........');
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	/*
  if (req.article.user.id !== req.user.id) {
		return res.send(403, {
			message: 'User is not authorized'
		});
	}
	next();
  */
  
  if (req.user && req.user.roles && _.contains(req.user.roles, 'admin')) {
        return next();
    } else {
        return res.send(403, 'You are not authorized to go here.');
    }
  
};