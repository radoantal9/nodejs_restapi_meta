'use strict';

module.exports = {
  
    db: 'mongodb://localhost/mean-dev',
  	//db: 'mongodb://heroku:i1QhSQwbhuEK8kL2axq7YaG9SD90aUCkrbZ3AopmpGyImUOnogSSAwoV9G48gKlNO-miUBtfPx6a9BZXl_ajTg@kahana.mongohq.com:10059/app28522040',
	app: {
		title: 'MarcAngelo Game - Development Environment'
	},
  
	facebook: {
		clientID: process.env.FACEBOOK_ID || '812591665425866',
    // clientID: process.env.FACEBOOK_ID || '249957245053401',
		clientSecret: process.env.FACEBOOK_SECRET || '982f03f62d538477de290b6079c8438a',
    // clientSecret: process.env.FACEBOOK_SECRET || 'f02b74de7346c311b3ce98af0ea5fee0',
		callbackURL: process.env.FACEBOOK_CALLBACK || 'http://loopback-125877.use1.nitrousbox.com/auth/facebook/callback',
    	oiverifyToken: process.env.FACEBOOK_VERIFY_TOKEN || 'w3p26hii3k53q7yi27wo'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'u0KRWzJcILh3GAMHyDJEzNSwP',
		clientSecret: process.env.TWITTER_SECRET || 's1tNr8sqMjW4AjKoEENsbvArhm6uiG40ilB5XB7hQutuLfLODz',
		callbackURL: process.env.TWITTER_CALLBACK || 'http://loopback-125877.use1.nitrousbox.com/auth/twitter/callback'
	},
	instagram: {
		clientID: process.env.INSTAGRAM_ID || 'a6f74e02c3c04e58b6ce2e4418565700',
		clientSecret: process.env.INSTAGRAM_SECRET || '82510044d9974c21937ada953af80b7c',
		callbackURL: process.env.INSTAGRAM_CALLBACK || 'http://loopback-125877.use1.nitrousbox.com/auth/instagram/callback'
	},
	gmail: {
		address: '',
		password: ''
	},
  /*
  ,
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	}
  */
};