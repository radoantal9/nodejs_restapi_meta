'use strict';

angular.module('core').controller('PlayController', ['$scope', '$window', 'Authentication', 
	function($scope, $window, Authentication) {
		$scope.authentication = Authentication;
		
		
		
	}
]);