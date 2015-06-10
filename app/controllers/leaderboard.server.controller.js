'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    Promise = require('promise'),
    Plays = mongoose.model('Play'),
    Leaderboard = mongoose.model('Leaderboard');

/**
 * Display Leaderboard Dataa
 */
exports.highest = function(req, res) {
  
  var getHighestScores = new Promise(function (resolve, reject){
    Plays
      .find({}, 'name score')
      .sort('-score')
      .limit(10)
      .exec(function(err, plays){
        if (err) {
          reject(err);
        } else {
          resolve(plays);
        }
      });
  });
  
  getHighestScores.then(
    function(result){
      res.json(result);
    }, 
    function(err){
      console.log(err);
    }
  );
  
};  