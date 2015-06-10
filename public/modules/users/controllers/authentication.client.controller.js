'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$stateParams', '$http', '$window', '$location', 'Authentication','anchorSmoothScroll',
	function($scope, $stateParams, $http, $window, $location, Authentication, anchorSmoothScroll) {
		$scope.authentication = Authentication;
		$scope.message = '';

		//If user is signed in then redirect back home
		// if ($scope.authentication.user) $location.path('/');
		if ($scope.authentication.user) $window.location.href='/#!/play';

		$scope.signup = function() {
			if( !$scope.credentials ){
				$scope.credentials = {};
			}
			if($scope.credentials.email)
				$scope.credentials.email = $scope.credentials.email.toLowerCase();

			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				$scope.authentication.user = response;

				//And redirect to the index page
				// $location.path('/');
				$window.location.href = '/#!/how-to-play';

			}).error(function(response) {
				$scope.error = response.message;
				anchorSmoothScroll.scrollTo('form-error');
			});

		};

		$scope.signin = function() {
			if( !$scope.credentials ){
				$scope.credentials = {};
			}
			if($scope.credentials.email)
				$scope.credentials.email = $scope.credentials.email.toLowerCase();

			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				$scope.authentication.user = response;

				//And redirect to the Game Play page
				console.log('logged in successfully...');
				$window.location.href = '/#!/play';

			}).error(function(response) {
				$scope.error = response.message;
				anchorSmoothScroll.scrollTo('form-error');
			});
		};

		$scope.forgotPassword = function() {
			if( !$scope.credentials ){
				$scope.credentials = {};
			}
			if($scope.credentials.email)
				$scope.credentials.email = $scope.credentials.email.toLowerCase();
			$http.post('/auth/password/forgot', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				//$scope.authentication.user = response;
				//And redirect to the Game Play page
				console.log('forgot password email sent successfully...');
				//$window.location.href = '/#!/signin';
				$scope.message = 'An email has been sent to ' + $scope.credentials.email + ' with a password reset link.';
				anchorSmoothScroll.scrollTo('form-message');
				
			}).error(function(response) {
				$scope.error = response.message;
				anchorSmoothScroll.scrollTo('form-error');
			});
		}

		$scope.newPassword = function() {
			if( !$scope.passwordDetails ){
				$scope.passwordDetails = false;				
			}	
				
			$http.post('/auth/password/reset/', $scope.passwordDetails).success(function(response) {
				$scope.authentication.user = response;

				//And redirect to the Game Play page
				console.log('logged in successfully...');
				$window.location.href = '/#!/play';			

			}).error(function(response) {
				$scope.error = response.message;
				anchorSmoothScroll.scrollTo('form-error');
			});
		}
		
		if ($stateParams.token) {
			$http.get('/auth/password/reset/' + $stateParams.token).success(function(response) {
				//If successful we assign the response to the global user model
				//$scope.authentication.user = response;
				$scope.validToken = true;
				$scope.passwordDetails = {"token": $stateParams.token}
			}).error(function(response) {
				$scope.validToken = false;
				$scope.error = response.message;
				anchorSmoothScroll.scrollTo('form-error');
			});
		}
	}
]);
 	