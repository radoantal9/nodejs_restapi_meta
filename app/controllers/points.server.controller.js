'use strict';

/**
 * Module dependencies.
 */

require('date-utils');

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Promise = require('promise'),
    config = require('../../config/config'),
    User = mongoose.model('User');

// console.log('challenges', config.challenges);

  // TEST...
// console.log( isWithinCurrentChallengeTimeFrame(new Date, new Date('2014-08-07T18:56:46.000Z')) );

function isWithinCurrentChallengeTimeFrame(current, post) {
  var retval = false;  
  for(var i=0; i < config.challenges.length; i++) {
    var ds = new Date(config.challenges[i].start),
        de = new Date(config.challenges[i].end);
    if (current.between(ds, de) && post.between(ds, de)) {
      retval = config.challenges[i-1];
      retval.number = i+1;
    }
  }
  return retval;
}

function userDeservesBallotForThisChallenge(user, challenge) {
  var retval = false;
  if (_.has(user.ballots, 'challenge_'+challenge.number)) {
    console.log('*** user.ballots has challenge.number property');
    if (user.ballots['challenge_'+challenge.number] == 1) {
      retval = false;
    }
  } else {
    retval = true;
  }
  return retval;
}

function awardPointToUserIfDeserved(data) {
  console.log('awardPointToUserIfDeserved...');
  
  var user = data.user;
  var current_time = new Date();
  var post_time = new Date(data.req.body.time);
  
  console.log('post_time', post_time);
  console.log('current_time', current_time);
  
  var challenge = isWithinCurrentChallengeTimeFrame(current_time, post_time);
  if (challenge) {
    console.log('YES. post is within current challenge time frame');
      // CHECK IF USER HAS ALREADY BEEN AWARDED A BALLOT FOR CURRENT CHALLENGE TIME FRAME:
    var deserved = userDeservesBallotForThisChallenge(user, challenge);
    if (deserved) {
      console.log('NA user has not been awarded ballot for current challenge');
      awardBallotForCurrentChallenge(user, challenge);
    } else {
      console.log('YA user has already been awarded for this challenge. ignore.');
    }
  } else {
    console.log('NO. post is not within current challenge time frame');
  }
  
};

function awardBallotForCurrentChallenge(user, challenge) {
  console.log('Awarding ballot....', user.displayName, challenge);
  var obj = user.ballots;
  obj['challenge_'+challenge['number']] = 1;
  console.log('obj', obj);
  user.update({ballots: obj}, function (err, numberAffected, raw) {
    if (err) console.log(err);
    else console.log('The number of updated documents was %d', numberAffected);
    // console.log('The raw response from Mongo was ', raw);
  });
}

exports.award = function(req, res) {
  req.session.destroy();
  User = mongoose.model('User');
  var promise = new Promise(function (resolve, reject) {
    if (req.body.source == 'twitter') {
      User.findOne({'additionalProvidersData.twitter.id': parseInt(req.body.userid)}, function (err, user) {        
        if (err) reject(err);
        else resolve({ user: user, req: req });
      });
    } else if (req.body.source == 'facebook') {
      User.findOne({'additionalProvidersData.facebook.id': req.body.userid}, function (err, user) {    
        if (err) reject(err);
        else resolve({ user: user, req: req });
      });
    }
  });
  
  promise.then(function(data){
    console.log('USER MATCHES!:', data.user.displayName);
    awardPointToUserIfDeserved(data);
  }, function(err){
    console.log(err);
  });
  res.send({"success": true});
};

