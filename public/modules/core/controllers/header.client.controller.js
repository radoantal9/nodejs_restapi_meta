'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$translate',
	function($scope, Authentication, Menus, $translate) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

    // angular.$forEach()
    
    	var wrapper = angular.element(document.getElementById('wrapper'));
    	var hamburger = angular.element(document.getElementById('nav-toggle'));
		
		$scope.toggleNav = function() {
		    if (wrapper.hasClass('toggled')) {
		        wrapper.removeClass('toggled');
		    } else {
		        wrapper.addClass('toggled');
		    }
		};

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		angular.element(document.querySelectorAll(".lang-btn." + $translate.use())).addClass('active');

		$scope.changeLanguage = function (langKey) {
		    $translate.use(langKey);
		    angular.element(document.querySelectorAll(".lang-btn")).removeClass('active');
		    angular.element(document.querySelectorAll(".lang-btn." + langKey)).addClass('active');
		};
	}
]);