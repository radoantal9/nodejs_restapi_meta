'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Play Schema
 */
var PlaySchema = new Schema({
	score: {
		type: Number,
		default: 0,
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	level: {
		type: Number
	},
	finished: {
		type: Date
	},
	name: {
		type: String,
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	coupon: {
		type: Schema.ObjectId,
		ref: 'Coupon'
	}
});

mongoose.model('Play', PlaySchema);
