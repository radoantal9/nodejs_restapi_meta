/*

  RUN THIS FILE TO GENERATE PRIZE DATA STRUCTURE

*/

var init = require('./config/init')(),
    config = require('./config/config'),
    mongoose = require('mongoose'),
    moment = require('moment'),
    moment_range = require('moment-range'),
    prettyjson = require('prettyjson');

// var userModel = require('./app/models/user');
var couponModel = require('./app/models/coupon');

var db = mongoose.connect(config.db);
var Coupon = mongoose.model('Coupon');

var start = moment('2014-09-11', 'YYYY-MM-DD').subtract('4', 'hours');
var end = moment('2014-10-11', 'YYYY-MM-DD').subtract('4', 'hours');
var coupons_available_per_day = 10;
// var days = [];
// var coupons = [];

console.log('Running setup...');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
    return a - b;
}

  // PUT DAYS INTO NEW ARRAY
var range = moment().range(start, end);
var day_list = [];
range.by('days', function(d){
  day_list.push(d);
});

  // ITERATE THROUGH THE # OF DAYS
for (var i=0; i < day_list.length; i++) {
  var mo = day_list[i];
  var times = [];

    // FOR EACH DAY, CREATE A RANDOM TIME FOR EACH PRIZE TO BE SERVED UP
  for (var j = 0; j < coupons_available_per_day; j++) {
    times.push(getRandomInt(0, 86400000)); // MILLISECONDS IN ONE DAY
  }

    // PUT THE RANDOM TIME VALUES IN SEQUENCE
  times.sort(compareNumbers);

  var day = mo.toISOString();

    // ITERATE THROUGH NUMBER OF COUPONS AVAILABLE PER DAY
  for (var k = 0; k < times.length; k++) {
    var milliseconds = times[k]; // ADD SECONDS FROM RANDOM TIME TO DAY
    var time = moment(day).add(milliseconds, 'ms').toISOString(); // .toISOString(); // ADD SECONDS FROM RANDOM TIME TO DAY
    var prize = {
      time: time
    };

    var coupon = new Coupon(prize);
    coupon.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        console.log('saved');
      }
    });

  }

}

// find({"time":{"$gte":{"$date":1410480000000},"$lt":{"$date":1410652800000}}}{"time":1}).sort({"time":1}).limit(25)

console.log('Complete.');
