'use strict';

angular.module('core').controller('NavController', ['$rootScope', '$scope', 'Authentication', 'Menus', '$translate',
	function($rootScope, $scope, Authentication, Menus, $translate) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		
		var wrapper = angular.element(document.getElementById('wrapper'));
		
		$scope.closeNav = function(){
			console.log('close nav');
		    wrapper.removeClass('toggled');
		}
		
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
     		$scope.closeNav();
   		});
		
	}
]);