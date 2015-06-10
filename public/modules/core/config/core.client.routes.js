'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
    state('play', {
			url: '/play',
			templateUrl: 'modules/core/views/play.client.view.html'
		}).
		state('rules', {
			url: '/rules',
			templateUrl: 'modules/core/views/rules.client.view.html'
		}).
		state('privacy', {
			url: '/privacy',
			templateUrl: 'modules/core/views/privacy.client.view.html'
		}).
		state('how-to-play', {
			url: '/how-to-play',
			templateUrl: 'modules/core/views/how-to-play.client.view.html'
		}).
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
    state('faq', {
      url: '/faq',
      templateUrl: 'modules/core/views/faq.client.view.html'
    }).
    state('unsupported-browser', {
      url: '/unsupported-browser',
      templateUrl: 'modules/core/views/unsupported-browser.client.view.html'
    });
    
	}
]);