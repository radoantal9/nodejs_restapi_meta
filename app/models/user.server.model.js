'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * Validate that the user has agreed to the contest rules...
 */
var validateLocalStrategyAgreeRules = function(property) {
  return property;
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * A Validation function for local strategy password check
 */
var validateLocalStrategyPasswordCheck = function(passwordCheck) {
	return (this.provider !== 'local' || (passwordCheck && passwordCheck.length > 6) || passwordCheck == this.password);
};

/**
 * User Schema
 */
var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your last name']
	},
	displayName: {
		type: String,
		trim: true
	},
	email: {
		type: String,
    unique: true,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your email'],
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
  
  street: {
		type: String,
		trim: true,
    validate: [validateLocalStrategyProperty, 'Please fill in your street']
	},
  
  city: {
    type: String,
    trim: true,
    validate: [validateLocalStrategyProperty, 'Please fill in your city']
  },
  
  province: {
    type: String,
    trim: true,
    validate: [validateLocalStrategyProperty, 'Please fill in your province']
  },
  
  postalCode: {
    type: String,
    trim: true,
    validate: [validateLocalStrategyProperty, 'Please fill in your postal code']
  },
  
  agreeContact: {
    type: Boolean,
    default: false
  },
  
  agreeRules: {
    type: Boolean,
    default: false,
    validate: [validateLocalStrategyAgreeRules, 'You must agree to the rules and regulations of this contest to enter']
  },
  
  /*
  highScore: {
    type: Number,
    default: 0
  },
  
	username: {
		type: String,
		unique: true,
		required: 'Please fill in a username',
		trim: true
	},
  */
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Password should be longer']
	},
  
	salt: {
		type: String
	},
	ballots: {
		type: Object,
		default: {'entry': 1}
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['user']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	resetPasswordToken: String,
  	resetPasswordExpires: Date
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  console.log('CALLING UserSchema.statics.findUniqueUsername');
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

mongoose.model('User', UserSchema);
