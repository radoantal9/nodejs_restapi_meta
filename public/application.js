'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

angular.module(ApplicationConfiguration.applicationModuleName).config(['$translateProvider',
   function($translateProvider) {

     $translateProvider.useStaticFilesLoader({
         prefix: 'lang/',
         suffix: '.json'
     });

     $translateProvider.preferredLanguage('en');
     $translateProvider.useLocalStorage();
   }
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', '$window', function($rootScope, $window) {

      // Unsupported browser test...
   if (!Modernizr.canvas) {
	    $window.location.href = '/#!/unsupported-browser';
	}
   
   $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
     var body = document.getElementsByTagName('body')[0];
     body.className = toState.name;
   });
}]);