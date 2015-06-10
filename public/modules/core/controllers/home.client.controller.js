'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication, $translateProvider) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);