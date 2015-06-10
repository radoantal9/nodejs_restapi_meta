'use strict';

/**
 * Module dependencies.
 */
var // mongoose = require('mongoose'),
  // social = require('./social'),
	// Tag = mongoose.model('Tag'),
  Promise = require('promise'),
	_ = require('lodash'),
  request = require('request'),
  config = require('../../config/config'),
  HASHTAG_SERVICE = config.HASHTAG_SERVICE; // 'http://hashtag-cacher.herokuapp.com/api/tags';

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Tag already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Show the current Tag
 */
exports.read = function(req, res) {
	res.jsonp(req.tag);
};

/*
var simplify = function(post) {
  var obj = {
    'id': post.id,
    'text': post.text || post.message,
    'created': post.created_time || post.created_at
  };
  
  if (_.has(post, 'entities')) { obj.type = 'twitter'; }
  if (_.has(post, 'likes')) { obj.type = 'facebook'; }
  
  // TODO: ADD INSTAGRAM DATA...
  
  if (_.has(post, 'entities')) { 
    if (_.has(post.entities, 'media')) { 
      obj.image = post.entities.media[0].media_url + ':small'; 
    }
  }
  if (_.has(post, 'picture')) { obj.image = post.picture; }
  if (_.has(post, 'from')) { obj.name = post.from.name; }
  if (_.has(post, 'user')) { obj.name = post.user.screen_name; }
  
  return obj;
}
*/


/**
 * Total # of Tags
 */
exports.total = function(req, res) {
  // var source = HASHTAG_SERVICE + 'facebook_posts';    
  var source = HASHTAG_SERVICE;    
  var getTotal = new Promise(function (resolve, reject) {    
    request(source + 'tags/count', function (err, resp) {
      if (err) reject(err);
      else resolve(resp);
    });
  });
  getTotal.then(function(result){
    // res.send(JSON.parse(result.body).count);
    res.send(result.body);
  }, function(err){
    console.log(err);
  });
};

/**
 * List of Tags
 */
exports.list = function(req, res){
  // var source = HASHTAG_SERVICE + 'facebook_posts';
  var source = HASHTAG_SERVICE;    
  var options = {
    order: 'created_at DESC', // <- twitter
    // order: 'created_time DESC', // <- facebook
    offset: req.params.offset || 0,
    limit: 10
  };
  var getList = new Promise(function (resolve, reject) {
    request(source + 'tags/?filter=' + JSON.stringify(options), function (err, resp) {
      if (err) reject(err);
      else resolve(resp);
    });
  });
  getList.then(function(result) {
    var data = JSON.parse(result.body);
    var filtered = [];
    _.each(data, function(item){
      if (item.approved) {
        filtered.push(item);
      } else if (req.user && _.contains(req.user.roles, 'admin')) { 
        console.log('req.user is not null', _.contains(req.user.roles, 'admin'));
        console.log('push non approved item (for admin)');
        filtered.push(item);
      }
    });
    res.send(filtered);
  }, function(err) {
    console.log(err);
  });
};



/**
 * Tag middleware
 */
exports.tagByID = function(req, res, next, id) { 
  
  /*
  Tag.findById(id).populate('user', 'displayName').exec(function(err, tag) {
		if (err) return next(err);
		if (! tag) return next(new Error('Failed to load Tag ' + id));
		req.tag = tag ;
		next();
	});
  */
  
};

/**
 * Tag authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.tag.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};