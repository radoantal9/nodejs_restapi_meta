'use strict';

module.exports = {
	app: {
		title: 'MarcAngelo Contest',
		description: 'MarcAngelo Contest Description',
		keywords: 'marcangelo, contest'
	},	
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/animate-css/animate.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        		'public/lib/ngInfiniteScroll/build/ng-infinite-scroll.js',
        		'public/lib/angular-linkify/angular-linkify.js',
        		'public/lib/angular-translate/angular-translate.js',
        		'public/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
        		'public/lib/angular-cookies/angular-cookies.js',
        		'public/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
        		'public/lib/angular-translate-storage-local/angular-translate-storage-local.js',
        		'public/lib/lodash/dist/lodash.js',
        'public/lib/modernizr/modernizr.js',
        'public/lib/phaser/build/phaser.min.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js',

      'public/game/js/init.js',
      'public/game/js/load.js',
      'public/game/js/menu.js',
      'public/game/js/playerselect.js',
      'public/game/js/howtoplay.js',
      'public/game/js/share.js',
      'public/game/js/leaderboard.js',
      'public/game/js/play.js',
      'public/game/js/realm.js',
      'public/game/js/dead.js',
      'public/game/js/game.js',
      'public/game/js/bleepblorp.js'

		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	},	
};
