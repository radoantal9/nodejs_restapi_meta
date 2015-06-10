'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tag Schema
 */
var LeaderboardSchema = new Schema({
    
    highest: [
        {
            score: 0,
		    created: {
                type: Date,
        	    default: Date.now
            },
        	user: {
        		type: Schema.ObjectId,
        		ref: 'User'
        	}
        }
    ]
    
    /*
	scores: {
		type: Array,
		default: [
		    score: 0,
		    created: {
                type: Date,
        	    default: Date.now
            },
        	user: {
        		type: Schema.ObjectId,
        		ref: 'User'
        	}
		]
	}
	*/
});

mongoose.model('Leaderboard', LeaderboardSchema);