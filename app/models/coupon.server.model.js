'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Play Schema
 */
var CouponSchema = new Schema({
  time: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  available: {
    type: Boolean,
    default: true 
  },
  claimed: {
    type: Boolean,
    default: false
  },
  claimTime: {
    type: Date
  },
  play: {
    type: Schema.ObjectId,
    ref: 'Play'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Coupon', CouponSchema);
