'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = 'MarcAngeloContest';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'infinite-scroll',
        'ngCookies',
        'pascalprecht.translate',
        'linkify'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName) {
      // Create angular module
      angular.module(moduleName, []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$translateProvider',
  function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'lang/',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
angular.module(ApplicationConfiguration.applicationModuleName).run([
  '$rootScope',
  function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      var body = document.getElementsByTagName('body')[0];
      body.className = toState.name;
    });
  }
]);'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('plays');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('tags');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
// Configuring the Articles module
angular.module('articles').run([
  'Menus',
  function (Menus) {
  }
]);'use strict';
// Setting up route
angular.module('articles').config([
  '$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider.state('listArticles', {
      url: '/articles',
      templateUrl: 'modules/articles/views/list-articles.client.view.html'
    }).state('createArticle', {
      url: '/articles/create',
      templateUrl: 'modules/articles/views/create-article.client.view.html'
    }).state('viewArticle', {
      url: '/articles/:articleId',
      templateUrl: 'modules/articles/views/view-article.client.view.html'
    }).state('editArticle', {
      url: '/articles/:articleId/edit',
      templateUrl: 'modules/articles/views/edit-article.client.view.html'
    });
  }
]);'use strict';
angular.module('articles').controller('ArticlesController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Articles',
  function ($scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;
    $scope.create = function () {
      var article = new Articles({
          title: this.title,
          content: this.content
        });
      article.$save(function (response) {
        $location.path('articles/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      this.title = '';
      this.content = '';
    };
    $scope.remove = function (article) {
      if (article) {
        article.$remove();
        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };
    $scope.update = function () {
      var article = $scope.article;
      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.find = function () {
      $scope.articles = Articles.query();
    };
    $scope.findOne = function () {
      $scope.article = Articles.get({ articleId: $stateParams.articleId });
    };
  }
]);'use strict';
//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', [
  '$resource',
  function ($resource) {
    return $resource('articles/:articleId', { articleId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('play', {
      url: '/play',
      templateUrl: 'modules/core/views/play.client.view.html'
    }).state('rules', {
      url: '/rules',
      templateUrl: 'modules/core/views/rules.client.view.html'
    }).state('privacy', {
      url: '/privacy',
      templateUrl: 'modules/core/views/privacy.client.view.html'
    }).state('how-to-play', {
      url: '/how-to-play',
      templateUrl: 'modules/core/views/how-to-play.client.view.html'
    }).state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    }).state('faq', {
      url: '/faq',
      templateUrl: 'modules/core/views/faq.client.view.html'
    });
  }
]);'use strict';
angular.module('core').controller('FaqController', [
  '$scope',
  function ($scope) {
    $scope.oneAtATime = true;
    $scope.groups = [
      {
        title: 'Dynamic Group Header - 1',
        content: 'Dynamic Group Body - 1'
      },
      {
        title: 'Dynamic Group Header - 2',
        content: 'Dynamic Group Body - 2'
      }
    ];
    $scope.items = [
      'Item 1',
      'Item 2',
      'Item 3'
    ];
    $scope.addItem = function () {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push('Item ' + newItemNo);
    };
    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
  }
]);'use strict';
angular.module('core').controller('FooterController', [
  '$scope',
  function ($scope) {
    $scope.test = 'test footer';
  }
]);'use strict';
angular.module('core').controller('GameController', [
  '$rootScope',
  '$scope',
  function ($rootScope, $scope) {
    if (user) {
      var cleanup = $rootScope.$on('$locationChangeStart', function (event, next, current) {
          var message = 'Are you sure you want to leave the game?';
          if (!window.confirm(message)) {
            event.preventDefault();
          } else {
            cleanup();
          }
        });
    }
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  '$translate',
  function ($scope, Authentication, Menus, $translate) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    // angular.$forEach()
    var wrapper = angular.element(document.getElementById('wrapper'));
    var hamburger = angular.element(document.getElementById('nav-toggle'));
    $scope.toggleNav = function () {
      if (wrapper.hasClass('toggled')) {
        wrapper.removeClass('toggled');
      } else {
        wrapper.addClass('toggled');
      }
    };
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
    angular.element(document.querySelectorAll('.lang-btn.' + $translate.use())).addClass('active');
    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
      angular.element(document.querySelectorAll('.lang-btn')).removeClass('active');
      angular.element(document.querySelectorAll('.lang-btn.' + langKey)).addClass('active');
    };
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  'Authentication',
  function ($scope, Authentication, $translateProvider) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);'use strict';
angular.module('core').controller('NavController', [
  '$scope',
  'Authentication',
  'Menus',
  '$translate',
  function ($scope, Authentication, Menus, $translate) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    var wrapper = angular.element(document.getElementById('wrapper'));
    $scope.closeNav = function () {
      console.log('close nav');
      wrapper.removeClass('toggled');
    };
  }
]);'use strict';
angular.module('core').directive('socialicon', [function () {
    return { template: '<img class="tag-source pull-left" src="/img/icn-{{tag.source}}.png">' };
  }]);'use strict';
angular.module('core').filter('timeago', [function () {
    //time: the time
    //local: compared to what time? default: now
    //raw: wheter you want in a format of "5 minutes ago", or "5 minutes"
    return function (time, local, raw) {
      if (!time)
        return 'never';
      if (!local) {
        local = Date.now();
      }
      if (angular.isDate(time)) {
        time = time.getTime();
      } else if (typeof time === 'string') {
        time = new Date(time).getTime();
      }
      if (angular.isDate(local)) {
        local = local.getTime();
      } else if (typeof local === 'string') {
        local = new Date(local).getTime();
      }
      if (typeof time !== 'number' || typeof local !== 'number') {
        return;
      }
      var offset = Math.abs((local - time) / 1000), span = [], MINUTE = 60, HOUR = 3600, DAY = 86400, WEEK = 604800, MONTH = 2629744, YEAR = 31556926, DECADE = 315569260;
      if (offset <= MINUTE)
        span = [
          '',
          raw ? 'now' : 'less than a minute'
        ];
      else if (offset < MINUTE * 60)
        span = [
          Math.round(Math.abs(offset / MINUTE)),
          'min'
        ];
      else if (offset < HOUR * 24)
        span = [
          Math.round(Math.abs(offset / HOUR)),
          'hr'
        ];
      else if (offset < DAY * 7)
        span = [
          Math.round(Math.abs(offset / DAY)),
          'day'
        ];
      else if (offset < WEEK * 52)
        span = [
          Math.round(Math.abs(offset / WEEK)),
          'week'
        ];
      else if (offset < YEAR * 10)
        span = [
          Math.round(Math.abs(offset / YEAR)),
          'year'
        ];
      else if (offset < DECADE * 100)
        span = [
          Math.round(Math.abs(offset / DECADE)),
          'decade'
        ];
      else
        span = [
          '',
          'a long time'
        ];
      span[1] += span[0] === 0 || span[0] > 1 ? 's' : '';
      span = span.join(' ');
      if (raw === true) {
        return span;
      }
      return time <= local ? span + ' ago' : 'in ' + span;
    };
  }]);'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['user'];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      // console.log('shouldRender, user: ', user);
      if (user) {
        for (var userRoleIndex in user.roles) {
          for (var roleIndex in this.roles) {
            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
              return true;
            }
          }
        }
      } else {
        // console.log('isPublic?? ', this.isPublic);
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic || this.menus[menuId].isPublic,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic || this.menus[menuId].isPublic,
            roles: roles || this.defaultRoles,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar', true);
  }]);'use strict';
//Setting up route
angular.module('plays').config([
  '$stateProvider',
  function ($stateProvider) {
    // Plays state routing
    $stateProvider.state('listPlays', {
      url: '/plays',
      templateUrl: 'modules/plays/views/list-plays.client.view.html'
    }).state('createPlay', {
      url: '/plays/create',
      templateUrl: 'modules/plays/views/create-play.client.view.html'
    }).state('viewPlay', {
      url: '/plays/:playId',
      templateUrl: 'modules/plays/views/view-play.client.view.html'
    }).state('editPlay', {
      url: '/plays/:playId/edit',
      templateUrl: 'modules/plays/views/edit-play.client.view.html'
    });
  }
]);'use strict';
// Plays controller
angular.module('plays').controller('PlaysController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Plays',
  function ($scope, $stateParams, $location, Authentication, Plays) {
    $scope.authentication = Authentication;
    // Create new Play
    $scope.create = function () {
      // Create new Play object
      var play = new Plays({ name: this.name });
      // Redirect after save
      play.$save(function (response) {
        $location.path('plays/' + response._id);
        // Clear form fields
        $scope.name = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Remove existing Play
    $scope.remove = function (play) {
      if (play) {
        play.$remove();
        for (var i in $scope.plays) {
          if ($scope.plays[i] === play) {
            $scope.plays.splice(i, 1);
          }
        }
      } else {
        $scope.play.$remove(function () {
          $location.path('plays');
        });
      }
    };
    // Update existing Play
    $scope.update = function () {
      var play = $scope.play;
      play.$update(function () {
        $location.path('plays/' + play._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Plays
    $scope.find = function () {
      $scope.plays = Plays.query();
    };
    // Find existing Play
    $scope.findOne = function () {
      $scope.play = Plays.get({ playId: $stateParams.playId });
    };
  }
]);'use strict';
//Plays service used to communicate Plays REST endpoints
angular.module('plays').factory('Plays', [
  '$resource',
  function ($resource) {
    return $resource('plays/:playId', { playId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
//Setting up route
angular.module('tags').config([
  '$stateProvider',
  function ($stateProvider) {
    // Tags state routing
    $stateProvider.state('listTags', {
      url: '/tags',
      templateUrl: 'modules/tags/views/list-tags.client.view.html'
    }).state('createTag', {
      url: '/tags/create',
      templateUrl: 'modules/tags/views/create-tag.client.view.html'
    }).state('viewTag', {
      url: '/tags/:tagId',
      templateUrl: 'modules/tags/views/view-tag.client.view.html'
    }).state('editTag', {
      url: '/tags/:tagId/edit',
      templateUrl: 'modules/tags/views/edit-tag.client.view.html'
    });
  }
]);'use strict';
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 1000);
// Tags controller
angular.module('tags').controller('TagsController', [
  '$scope',
  '$stateParams',
  '$location',
  '$http',
  'Authentication',
  'Tags',
  function ($scope, $stateParams, $location, $http, Authentication, Tags) {
    $scope.authentication = Authentication;
    $scope.tags = [];
    var offset = 0, total = 0;
    $scope.init = function () {
      $http.get('/tags/total').success(function (data, status) {
        total = data.count;
        // console.log('total: ', total);
        $scope.load();
      }).error(function (data, status) {
        console.log('ERROR: ', data, status);
      });
    };
    $scope.load = function () {
      // console.log('offset: ', offset);
      // console.log('$scope.tags.length', $scope.tags.length, 'total:', total);
      if ($scope.tags.length < total) {
        // var dups = [];
        $http.get('/tags/' + offset).success(function (data, status) {
          _.forEach(data, function (item) {
            if ($scope.tags.length <= total) {
              // $scope.tags.push(item);
              // console.log($scope.tags.length);
              // console.log(item.id);
              if (_.where($scope.tags, { id: item.id.toString() }).length === 0) {
                $scope.tags.push(item);
              } else {
              }
            }
          });
        }).error(function (data, status) {
          console.log(data, status);
        });
        offset = offset + 10;
      } else {
      }
    };
    $scope.isAdmin = function () {
      var retval = false;
      if (Authentication.user !== null) {
        retval = _.contains(Authentication.user.roles, 'admin');
      }
      return retval;
    };
    $scope.toggle = function (id) {
      console.log('toggle', id);
      var el = angular.element(document.querySelector('#tag-' + id));
      $http.post('/admin/toggle/' + id).success(function (data, status) {
        console.log('success', data, status);
        el.toggleClass('unapproved');
      }).error(function (data, status) {
        console.log('success', data, status);
      });
    };
  }
]);'use strict';
//Tags service used to communicate Tags REST endpoints
angular.module('tags').factory('Tags', [
  '$resource',
  function ($resource) {
    return $resource('tags/:tagId', { tagId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/signin.client.view.html'
    });
  }
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$window',
  '$location',
  'Authentication',
  function ($scope, $http, $window, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        //And redirect to the index page
        // $location.path('/');
        console.log('signed up successfully...');
        $window.location.href = '/#!/play';
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        //And redirect to the Game Play page
        console.log('logged in successfully...');
        $window.location.href = '/#!/play';
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function () {
      $scope.success = $scope.error = null;
      var user = new Users($scope.user);
      user.$update(function (response) {
        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);WebFontConfig = { google: { families: ['Oswald'] } };
(function () {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
}());Game = {};
// var w = 450;
// var h = 600;
var w = 320;
// window.innerWidth;
var h = 440;
// window.innerHeight;
var score = 0;
var best_score = 0;
var sound = false;
var playerSelected = 1;
var realm = 1;
var realms = [
    { threshold: 500 },
    { threshold: 1000 },
    { threshold: 1500 },
    { threshold: 2000 },
    { threshold: 2500 }
  ];
var filter;
function rand(num) {
  return Math.floor(Math.random() * num);
}
;
function createTitle(txt, icon) {
  var bar = game.add.graphics(0, 0);
  bar.beginFill(5877719);
  bar.drawRect(0, 0, w, 42);
  var title = game.add.text(50, 8, txt, {
      font: '18px Oswald',
      fill: '#fff'
    });
  title.setShadow(1, 1, 'rgba(0, 0, 0, 0.2)', 5);
  if (icon) {
  }
}
function createGround() {
  var ground = game.add.sprite(0, 355, 'ground');
  ground.scale.setTo(0.5, 0.5);
}
/*
var pause_ctrl = document.getElementById('control-pause');
pause_ctrl.onclick = function(){
  console.log('clicked pause');
  Phaser.GAMES[0].paused = true;
}
*/
Game.Boot = function (game) {
};
Game.Boot.prototype = {
  preload: function () {
    game.stage.backgroundColor = '#87d1f2';
    game.load.image('loading', 'game/images/loading.png');
    game.load.image('loading2', 'game/images/loading2.png');
    game.load.image('orientation', 'game/images/orientation.png');  // game.load.bitmapFont('kemco', 'fonts/kemco.png', 'fonts/kemco.xml');
  },
  create: function () {
    // game.scale.minWidth = w;
    // game.scale.minHeight = h;
    game.scale.width = w;
    game.scale.height = h;
    // game.scale.pageAlignHorizontally = true;
    // game.scale.pageAlignVertically = false;
    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    game.scale.setScreenSize();
    game.scale.forcePortrait = true;
    if (!this.game.device.desktop) {
      document.body.style.backgroundColor = '#87d1f2';  // game.stage.scale.forceOrientation(false, true, 'orientation');
                                                        // game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
                                                        // this.game.stage.scale.pageAlignHorizontally = true;
                                                        // this.game.stage.scale.pageAlignVeritcally = true;
                                                        // game.stage.scale.setShowAll();
                                                        // game.stage.scale.refresh();
                                                        // this.game.antialias = false;
                                                        // game.smoothed = false;
    }
    // this.game.stage.scale.setScreenSize(true);
    this.game.state.start('Load');
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }
};
Game.Load = function (game) {
};
Game.Load.prototype = {
  preload: function () {
    preload_label = game.add.text(0, h * 0.5 - 40, 'Loading...', {
      font: '32px kemco',
      fill: '#fff',
      stroke: '#000',
      strokeThickness: 5
    });
    preload_label.x = (w - preload_label.width) * 0.5;
    preloading2 = game.add.sprite(w / 2, h / 2 + 15, 'loading2');
    preloading2.x -= preloading2.width / 2;
    preloading = game.add.sprite(w / 2, h / 2 + 19, 'loading');
    preloading.x -= preloading.width / 2;
    game.load.setPreloadSprite(preloading);
    game.load.image('logo', 'game/images/1-preplayscreen-Logo_agents.png');
    game.load.image('heart', 'game/images/heart.png');
    game.load.image('burger', 'game/images/food/burger.png');
    game.load.image('hotdog', 'game/images/food/hotdog.png');
    game.load.image('kebab', 'game/images/food/kebab.png');
    game.load.image('spike', 'game/images/spikes.png');
    game.load.image('cloud', 'game/images/cloud1.png');
    game.load.image('ground', 'game/images/3-leaderboard-Grass.png');
    game.load.image('platform', 'game/images/platform.png');
    game.load.image('player_zoom', 'game/images/player_zoom.png');
    // game.load.spritesheet('player', 'images/character/marc.png', 60, 77);
    game.load.spritesheet('p1', 'game/images/character/marc.png', 60, 77);
    game.load.spritesheet('p2', 'game/images/character/angelo.png', 60, 77);
    game.load.spritesheet('button_start', 'game/images/buttons/button_sprite_sheet.png', 193, 71);
    game.load.image('line', 'game/images/line.png');
    game.load.image('snow', 'game/images/snow.jpg');
    game.load.spritesheet('mute', 'game/images/mute.png', 28, 18);
    game.load.image('pausepic', 'game/images/pausepic.jpg');
    game.load.image('clouds_intro', 'game/images/1-preplayscreen-Clouds.png');
    game.load.image('character_intro', 'game/images/1-preplayscreen-Character.png');
    game.load.image('p1static', 'game/images/Marc-static.png');
    game.load.image('p2static', 'game/images/Angelo-static.png');
    game.load.image('facebook', 'game/images/4-GameShare-Facebook.png');
    game.load.image('instagram', 'game/images/4-GameShare-Instagram.png');
    game.load.image('twitter', 'game/images/4-GameShare-Twitter.png');
    game.load.image('email', 'game/images/4-GameShare-Email.png');
    game.load.image('btn_mainmenu', 'game/images/button-mainmenu.png');  /*
		game.load.audio('dead', 'sounds/dead.wav');
		game.load.audio('jump', 'sounds/jump.wav');
		game.load.audio('heart', 'sounds/heart.wav');
		game.load.audio('music', 'sounds/music.wav');
		game.load.audio('hit', 'sounds/hit.wav');
    */
                                                                         // game.load.script('filter', 'js/filters/Gray.js');
                                                                         // this.load.bitmapFont('minecraftia', 'fonts/minecraftia.png', 'fonts/minecraftia.xml');
  },
  create: function () {
    game.state.start('Menu');
  }
};Game.Menu = function (game) {
};
Game.Menu.prototype = {
  create: function () {
    // var header = document.getElementById('header');
    // header.style.display = 'block';
    this.clouds = game.add.sprite(0, 110, 'clouds_intro');
    // this.clouds.smoothed = false;
    this.clouds.scale.setTo(0.5, 0.5);
    this.logo = game.add.sprite(0, 30, 'logo');
    this.logo.scale.setTo(0.5, 0.5);
    this.logo.x = (w - this.logo.width - 140) * 0.5;
    this.character = game.add.sprite(170, 110, 'character_intro');
    this.character.frame = 0;
    this.character.scale.setTo(0.5, 0.5);
    this.platform = game.add.sprite(230, 380, 'platform');
    this.platform.scale.setTo(0.8, 0.8);
    var menuItems = [
        {
          text: 'Play',
          size: '40px',
          state: 'PlayerSelect'
        },
        {
          text: 'How To Play',
          size: '20px',
          state: 'HowToPlay'
        },
        {
          text: 'Share',
          size: '20px',
          state: 'Share'
        },
        {
          text: 'Leaderboard',
          size: '20px',
          state: 'Leaderboard'
        }
      ];
    var menuOptions = {
        font: 'kemco',
        startX: 0,
        startY: 200,
        x: 20,
        y: 0,
        labelX: (w - 260) * 0.5,
        marginBottom: 25,
        off: 16777215,
        on: 16711680
      };
    function createMenu(items, options) {
      var menu = {
          items: [],
          selected: 'Play'
        };
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var y;
        if (i === 0) {
          y = options.startY;
        } else {
          var previousItem = menu.items[i - 1];
          y = previousItem.y + previousItem.height + options.marginBottom;
        }
        var label = game.add.text(options.x, y, item.text, {
            font: item.size + ' ' + options.font,
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 7
          });
        label.state = item.state;
        label.inputEnabled = true;
        label.events.onInputUp.add(function (e) {
          if (e.state == 'HowToPlay') {
            window.location.href = '/#!/how-to-play';
          } else {
            game.state.start(e.state);
          }
        });
        menu.items.push(label);
        if (i === 0) {
          label.tint = options.on;
        }
      }
      return menu;
    }
    var menu = createMenu(menuItems, menuOptions);
  },
  update: function () {
  },
  shutdown: function () {
    game.world.removeAll();
  }
};Game.PlayerSelect = function (game) {
};
Game.PlayerSelect.prototype = {
  create: function () {
    createTitle('Select a character');
    createGround();
    this.p1_label = game.add.text(0, 100, 'Marc', {
      font: '28px kemco',
      fill: '#fff',
      stroke: '#000',
      strokeThickness: 5
    });
    this.p2_label = game.add.text(0, 100, 'Angelo', {
      font: '28px kemco',
      fill: '#fff',
      stroke: '#000',
      strokeThickness: 5
    });
    this.p1_label.x = 36;
    // (w - this.p1_label.width - this.p2_label.width - 30 ) * 0.5;
    this.p2_label.x = 160;
    // (w + this.p1_label.width - this.p2_label.width + 30 ) * 0.5;
    // this.p1_label.tint = 0xFF0000;
    /*
    this.p1 = game.add.sprite(0, 200, 'p1');
    this.p1.x = this.p1_label.x + ((this.p1_label.width - this.p1.width) * 0.5);
    this.p1.frame = 1;
    this.p1.inputEnabled = true;
    this.p1.events.onInputUp.add(function(e){
      playerSelected = 1;
      game.state.start('Play');
    });
    
    this.p2 = game.add.sprite(0, 200, 'p2');
    this.p2.x = this.p2_label.x + ((this.p2_label.width - this.p2.width) * 0.5);
    this.p2.frame = 1;
    this.p2.inputEnabled = true;
    this.p2.events.onInputUp.add(function(e){
      playerSelected = 2;
      game.state.start('Play');
    });
    */
    this.marc = game.add.sprite(42, 180, 'p1static');
    this.marc.smoothed = false;
    this.marc.frame = 1;
    this.marc.scale.setTo(1.3, 1.3);
    this.marc.inputEnabled = true;
    this.marc.events.onInputUp.add(function (e) {
      playerSelected = 1;
      game.state.start('Play');
    });
    this.angelo = game.add.sprite(190, 184, 'p2static');
    this.angelo.smoothed = false;
    this.angelo.frame = 1;
    this.angelo.scale.setTo(1.3, 1.3);
    this.angelo.inputEnabled = true;
    this.angelo.events.onInputUp.add(function (e) {
      playerSelected = 2;
      game.state.start('Play');
    });
    // this.p2.alpha = 0.5;
    // this.button_start = game.add.button((w - 95) * 0.5, this.p2.x + this.p2.height + 20, 'button_start', onClick_button_start, this, 2, 1, 0);
    function onClick_button_start() {
      game.state.start('Play');
    }
    this.cursor = this.game.input.keyboard.createCursorKeys();
  },
  update: function () {
  },
  shutdown: function () {
    game.world.removeAll();
  }
};Game.HowToPlay = function (game) {
};
Game.HowToPlay.prototype = {
  create: function () {
    createTitle('How to Play');
    var txt = 'Bacon ipsum dolor sit amet t-bone andouille ribeye sausage prosciutto kielbasa, turducken short ribs pork belly. Pork pork belly spare ribs, frankfurter doner sirloin corned beef tenderloin cow turducken andouille tri-tip beef pancetta bacon. Turkey turducken spare ribs tongue frankfurter. Filet mignon andouille prosciutto pork chop porchetta. Prosciutto pork chop shoulder leberkas ground round kielbasa. \n\nVenison salami tri-tip, cow rump pig sausage pork chop andouille brisket tail strip steak. Tail filet mignon prosciutto, salami flank pork chop ribeye bresaola meatball pig pastrami swine drumstick. Ham ball tip sirloin capicola beef ribs. Ribeye chuck capicola pork loin fatback tail drumstick sirloin swine short loin hamburger biltong bresaola.';
    this.copy = game.add.text(50, 70, txt, {
      font: '12px Arial',
      fill: '#000'
    });
    this.copy.wordWrap = true;
    this.copy.wordWrapWidth = 200;
    this.cursor = this.game.input.keyboard.createCursorKeys();
  },
  update: function () {
    if (this.cursor.up.isDown || game.input.activePointer.isDown)
      game.state.start('Menu');
  },
  shutdown: function () {
    game.world.removeAll();
  }
};Game.Share = function (game) {
};
Game.Share.prototype = {
  create: function () {
    createTitle('Share');
    createGround();
    this.marc = game.add.sprite(70, 230, 'p1static');
    this.marc.smoothed = false;
    this.marc.frame = 1;
    this.angelo = game.add.sprite(200, 234, 'p2static');
    this.angelo.smoothed = false;
    this.angelo.frame = 1;
    this.facebook = game.add.sprite(40, 80, 'facebook');
    this.facebook.scale.setTo(0.5, 0.5);
    this.facebook.inputEnabled = true;
    this.facebook.events.onInputUp.add(function (e) {
      console.log('share w/ facebook');
    });
    this.instagram = game.add.sprite(105, 80, 'instagram');
    this.instagram.scale.setTo(0.5, 0.5);
    this.instagram.inputEnabled = true;
    this.instagram.events.onInputUp.add(function (e) {
      console.log('share w/ instagram');
    });
    this.twitter = game.add.sprite(170, 80, 'twitter');
    this.twitter.scale.setTo(0.5, 0.5);
    this.twitter.inputEnabled = true;
    this.twitter.events.onInputUp.add(function (e) {
      console.log('share w/ twitter');
    });
    this.email = game.add.sprite(235, 80, 'email');
    this.email.scale.setTo(0.5, 0.5);
    this.email.inputEnabled = true;
    this.email.events.onInputUp.add(function (e) {
      console.log('share w/ email');
    });
    this.btn_mainmenu = game.add.sprite(80, 160, 'btn_mainmenu');
    this.btn_mainmenu.scale.setTo(0.5, 0.5);
    this.btn_mainmenu.inputEnabled = true;
    this.btn_mainmenu.events.onInputUp.add(function (e) {
      game.state.start('Menu');
    });
    this.cursor = this.game.input.keyboard.createCursorKeys();
  },
  update: function () {
  },
  shutdown: function () {
    game.world.removeAll();
  }
};Game.Leaderboard = function (game) {
};
Game.Leaderboard.prototype = {
  create: function () {
    createTitle('Leaderboard');
    function createLeaderboardEntry(place, name, points) {
      var title = game.add.text(50, 30 + place * 30, place + '.\t\t\t\t' + name + '\t\t\t\t' + points + 'pts', {
          font: '18px Oswald',
          fill: '#000'
        });
      return title;
    }
    var req = new XMLHttpRequest();
    req.onload = function () {
      var leaders = JSON.parse(this.responseText);
      for (var i = 0; i < leaders.length; i++) {
        createLeaderboardEntry(i + 1, leaders[i].name, leaders[i].score);
      }
    };
    req.open('get', '/leaderboard', true);
    // req.setRequestHeader('Content-Type', 'application/json');
    req.send();
    this.btn_mainmenu = game.add.sprite(80, 380, 'btn_mainmenu');
    this.btn_mainmenu.scale.setTo(0.5, 0.5);
    this.btn_mainmenu.inputEnabled = true;
    this.btn_mainmenu.events.onInputUp.add(function (e) {
      game.state.start('Menu');
    });  // this.cursor = this.game.input.keyboard.createCursorKeys();
  },
  update: function () {
  },
  shutdown: function () {
    game.world.removeAll();
  }
};Game.Play = function (game) {
  this.debug = true;
  this.hud = null;
  this.o = undefined;
  this.speedFactor = {
    desktop: 15,
    mobile: 10
  };
};
Game.Play.prototype = {
  setupBoundsCheckingOnChildrenOfGroup: function (group) {
    for (var i = 0; i < group.children.length; i++) {
      var child = group.children[i];
      child.checkWorldBounds = true;
      child.events.onOutOfBounds.add(function (child) {
        // console.log('OOB!', child);
        child.exists = false;
      });
    }
  },
  preload: function () {
    this.game.time.advancedTiming = true;
    if (playerSelected == 1) {
      game.load.spritesheet('player', 'game/images/character/marc.png', 60, 77);
    } else {
      game.load.spritesheet('player', 'game/images/character/angelo.png', 60, 77);
    }
  },
  create: function () {
    this.realmThreshold = realms[realm - 1]['threshold'];
    ;
    this.realmProgress = 0;
    // this.realmTheshold = realms[realm-1]['threshold'];
    console.log('set realmTheshold:', this.realmThreshold, 'realm:', realm, 'realmProgress:', this.realmProgress);
    // var header = document.getElementById('header');
    // header.style.display = 'none';
    this.game.world.setBounds(0, -100000, w, h + 100000);
    this.cursor = this.game.input.keyboard.createCursorKeys();
    this.bg = game.add.sprite(0, 0, 'snow');
    this.bg.width = 320;
    this.bg.height = 480;
    this.bg.alpha = 0;
    this.bg.fixedToCamera = true;
    this.clouds = game.add.group();
    this.clouds.createMultiple(6, 'cloud');
    // this.clouds.setAll('outOfBoundsKill', true);
    this.setupBoundsCheckingOnChildrenOfGroup(this.clouds);
    if (score > best_score)
      best_score = score;
    // score = 0;
    if (realm === 1) {
      score = 0;
    }
    /*
      var vignette = game.add.bitmapData(800, 600);
      vignette.fixedToCamera = true;
      var grd=vignette.context.createLinearGradient(0,0,0,500);
      grd.addColorStop(0, '#ffffff');
      grd.addColorStop(1, '#0a68b0');
      vignette.context.fillStyle=grd;
      vignette.context.fillRect(0,0,800,580);
      game.add.sprite(0, 0, vignette);
      */
    /*if (best_score > 0) {
	    	var x = -best_score*10+h/2;
			this.score_line = game.add.sprite(0, x, 'line');
			this.score_line_label = game.add.text(w-100, x-25, 'best score', { font: '20px Arial', fill: '#fff' });
		}*/
    this.platforms = game.add.group();
    this.platforms.createMultiple(15, 'platform');
    this.game.physics.enable(this.platforms);
    // this.platforms.setAll('body.scale.x', 0.5);
    // this.platforms.setAll('body.scale.y', 0.5);
    this.platforms.setAll('body.immovable', true);
    this.platforms.setAll('body.checkCollision.down', false);
    this.platforms.setAll('body.checkCollision.right', false);
    this.platforms.setAll('body.checkCollision.left', false);
    this.setupBoundsCheckingOnChildrenOfGroup(this.platforms);
    this.hearts = game.add.group();
    this.game.physics.enable(this.hearts);
    this.hearts.createMultiple(3, 'heart');
    this.setupBoundsCheckingOnChildrenOfGroup(this.hearts);
    this.foods = game.add.group();
    this.game.physics.enable(this.foods);
    // this.foods.createMultiple(3, 'food');
    // this.foods.create(0, 0, 'burger');
    // this.foods.create(0, 0, 'hotdog');
    // this.foods.create(0, 0, 'kebab');
    this.foods.createMultiple(1, 'burger');
    this.foods.createMultiple(1, 'hotdog');
    this.foods.createMultiple(1, 'kebab');
    this.setupBoundsCheckingOnChildrenOfGroup(this.foods);
    this.spikes = game.add.group();
    this.spikes.createMultiple(5, 'spike');
    this.setupBoundsCheckingOnChildrenOfGroup(this.spikes);
    this.emitter = game.add.emitter(0, 0, 100);
    this.emitter.x = -100;
    this.emitter.on = false;
    // this.emitter.makeParticles('heart');
    this.emitter.makeParticles('snow');
    this.emitter.gravity = 10;
    // this.emitter.start(false, 1000, 15, 0);
    this.emitter.width = 50;
    this.player = this.game.add.sprite(w / 2 + 100, h - 200, 'player');
    this.game.physics.enable(this.player);
    this.player.smoothed = false;
    this.player.body.gravity.y = 12 * 50;
    this.player.anchor.setTo(0.5, 1);
    // this.player.scale.setTo(1.5, 1.5);
    this.ground = this.game.add.sprite(0, h - 56, 'ground');
    this.game.physics.enable(this.ground);
    // this.ground.scale.setTo(15, 1);
    this.ground.width = w;
    this.ground.body.immovable = true;
    this.ground.outOfBoundsKill = true;
    this.jump_s = game.add.audio('jump');
    this.heart_s = game.add.audio('heart');
    this.hit_s = game.add.audio('hit');
    this.music_s = game.add.audio('music');
    if (sound)
      this.music_s.play('', 0, 0.2, true);
    this.maxX = h / 2 - 20;
    this.next_platform = 10;
    this.next_cloud = 50;
    this.took_heart = false;
    this.count_update = 0;
    this.init_level();
    var that = this;
    function handleOrientation(event) {
      that.o = event;
    }
    if (window.DeviceMotionEvent) {
      // console.log('DEVICE MOTION:', window.DeviceMotionEvent);
      window.addEventListener('deviceorientation', handleOrientation, false);
    }
    // ADD MENU (HUD)...
    this.hud = game.add.group();
    this.hud.fixedToCamera = true;
    var hud = this.hud;
    this.overlay = game.add.group();
    this.overlay.alpha = 0;
    this.overlay.fixedToCamera = true;
    var overlay = this.overlay;
    var bar = game.add.graphics(0, 0);
    bar.beginFill(12719392);
    bar.drawRect(0, 0, w, 50);
    this.hud.add(bar);
    this.home_label = game.add.text(15, 15, 'BACK', {
      font: '20px Oswald',
      fill: '#fff'
    }, this.hud);
    this.home_label.inputEnabled = true;
    this.home_label.events.onInputUp.add(function () {
      var message = 'Are you sure you want to leave the game?';
      if (window.confirm(message)) {
        game.state.start('Menu');
      }
    });
    this.score_title = game.add.text(w * 0.5, 8, '0', {
      font: '10px Oswald',
      fill: '#fff'
    }, this.hud);
    this.score_title.text = 'SCORE';
    this.score_label = game.add.text(w * 0.5, 17, '0', {
      font: '24px Oswald',
      fill: '#fff'
    }, this.hud);
    if (this.debug)
      this.debug_label = game.add.text(15, 60, 'fps', {
        font: '20px Oswald',
        fill: '#fff'
      }, this.hud);
    overlay_bg = game.add.graphics(0, 0, overlay);
    overlay_bg.beginFill(8244722);
    overlay_bg.alpha = 1;
    overlay_bg.drawRect(0, 0, w, h);
    this.pausepic = overlay.create(0, 0, 'pausepic');
    this.pausepic.scale.setTo(0.5, 0.5);
    // console.log('pause pic height', this.pausepic.height);
    this.marketing_title = game.add.text(30, this.pausepic.height + 30, 'DINNER TIME?', {
      font: '20px Arial',
      fill: '#fff'
    }, this.overlay);
    // console.log('marketing title x', this.marketing_title.x);
    this.marketing_copy = game.add.text(30, 325, 'Try our new Authentic Souvlaki!', {
      font: '14px Arial',
      fill: '#fff'
    }, this.overlay);
    this.pause_label = game.add.text(w, 15, '0', {
      font: '20px Oswald',
      fill: '#fff'
    }, this.hud);
    this.pause_label.text = 'PAUSE';
    this.pause_label.inputEnabled = true;
    var pause_label = this.pause_label;
    this.pause_label.events.onInputUp.add(function () {
      // pause_label.text = 'RESUME';
      // pause_label.x = w - pause_label.width - 20;
      // pause_label.x = (w - pause_label.width) * 0.5;
      // pause_label.y = (h - pause_label.height) * 0.5;
      game.paused = true;
      overlay.alpha = 1;
    });
    // console.log('marketing copy x', this.marketing_copy.x);
    this.resume_label = game.add.text(30, 350, '0', {
      font: '20px Oswald',
      fill: '#fff'
    }, this.overlay);
    this.resume_label.text = 'RESUME';
    // this.resume_label.x = (w - this.resume_label.width) * 0.5;
    // this.resume_label.y = (h - this.resume_label.height) * 0.5;
    game.input.onDown.add(unpause, self);
    function unpause(event) {
      if (game.paused) {
        // pause_label.text = 'PAUSE';
        // pause_label.x = w - pause_label.width - 20;
        // pause_label.y = 15;
        overlay.alpha = 0;
        game.paused = false;
      }
    }  // this.level1 = game.add.bitmapText(20, 100, 'kemco', '', 20);
  },
  update: function () {
    if (this.player.alive) {
      if (this.ground.alive)
        game.physics.arcade.collide(this.player, this.ground);
      game.physics.arcade.collide(this.player, this.platforms);
      game.physics.arcade.overlap(this.player, this.hearts, this.take_heart, null, this);
      game.physics.arcade.overlap(this.player, this.foods, this.take_food, null, this);
      game.physics.arcade.overlap(this.player, this.spikes, this.take_spike, null, this);
    }
    if (score === 100) {
    }
    if (100 < score && score < 200) {
    }
    if (200 < score) {
    }
    if (this.player.body.y < this.game.camera.y + h / 2) {
      this.move_screen_up();
      this.generate_level();
    }
    if (this.count_update == 20) {
      this.count_update = 0;
      this.platforms.forEachAlive(this.update_platform, this);
      this.hearts.forEachAlive(this.update_heart, this);
      this.foods.forEachAlive(this.update_food, this);
      this.spikes.forEachAlive(this.update_spike, this);
    } else
      this.count_update += 1;
    this.player_move();
    this.score_title.x = (w - this.score_title.width) * 0.5;
    this.score_label.x = (w - this.score_label.width) * 0.5;
    this.pause_label.x = w - this.pause_label.width - 20;
    // ACCELEROMETER
    if (typeof this.o === 'object') {
      var gamma = this.o.gamma;
      /*
      if (-30 > gamma || gamma > 30 ) {
        this.bg.opacity = Math.abs(gamma) * 0.1;
      }
      */
      if (-40 > gamma || gamma > 40) {
        game.paused = true;
        // this.pause_label.text = 'RESUME';
        // this.pause_label.x = w - this.pause_label.width - 20;
        this.overlay.alpha = 1;
      }
    }
    if (this.debug)
      this.debug_label.text = this.game.time.fps + 'fps';
  },
  init_level: function () {
    console.log('init_level...');
    // this.add_platform(h-150, 100);
    // this.add_platform(h-300, 200);
    // this.add_platform(h-450, 300);
    // this.add_platform(h-550, 300);
    this.add_platform(h * 0.2, w * 0.2);
    this.add_platform(h * 0.4, w * 0.4);
    this.add_platform(h * 0.6, w * 0.6);
    this.add_platform(h * 0.8, w * 0.8);
    // this.add_cloud(h-300);
    // this.add_cloud(h-500);
    this.add_cloud(h * 0.3);
    this.add_cloud(h * 0.6);
  },
  generate_level: function () {
    console.log('generate_level...');
    if (this.next_platform < -this.game.camera.y) {
      if (score < 250) {
        var level = [
            1,
            1,
            1,
            1,
            2,
            2,
            2,
            3,
            5,
            5
          ];
      } else if (score < 500) {
        var level = [
            1,
            1,
            2,
            2,
            2,
            3,
            3,
            4,
            4,
            5
          ];
      } else if (score < 1000) {
        var level = [
            1,
            2,
            2,
            3,
            3,
            3,
            4,
            4,
            4,
            5
          ];
      } else if (score < 2000) {
        var level = [
            1,
            2,
            3,
            3,
            3,
            4,
            4,
            4,
            4,
            5
          ];
      } else if (score < 3000) {
        var level = [
            2,
            3,
            3,
            3,
            4,
            4,
            4,
            4,
            4,
            5
          ];
      } else {
        var level = [
            2,
            3,
            3,
            4,
            4,
            4,
            4,
            4,
            4,
            4
          ];
      }
      var type = level[rand(level.length)];
      var y = this.game.camera.y - 30;
      this.next_platform += rand(80) + 70;
      if (type == 1)
        // this.add_platform_double(y);
        this.add_platform(y);
      else if (type == 2)
        this.add_platform(y);
      else if (type == 3)
        this.add_platform_moving(y);
      else if (type == 4) {
        if (rand(3) > 0)
          this.add_platform_moving(y);
        else
          this.add_platform(y);
        // this.add_platform_double(y);
        this.add_platform_spike(y - 150);
        this.next_platform += 150;
      } else if (type == 5)
        // this.add_platform_heart(y);
        this.add_platform_food(y);
    }
    if (this.next_cloud < -this.game.camera.y) {
      // console.log('this.next_cloud', this.next_cloud);
      this.add_cloud(this.game.camera.y - 70);
      this.next_cloud += 100 + rand(200);
    }
  },
  move_screen_up: function () {
    var delta = this.game.camera.y + Math.floor(h / 2) - this.player.body.y;
    this.game.camera.y -= delta;
    // score = - Math.floor(this.game.camera.y/10);
    score += Math.abs(Math.floor(this.game.camera.y / 10000));
    this.score_label.text = score;
    this.realmProgress = Math.abs(this.game.camera.y);
    console.log(score, this.game.camera.y, this.realmProgress, this.realmThreshold);
    if (this.realmProgress > this.realmThreshold) {
      // game.paused = true;
      console.log('passed realm #' + realm, this.realmProgress, this.realmThreshold);
      game.state.start('Realm');
    }  // if (score > )
  },
  player_move: function () {
    if (this.player.body.y > this.game.camera.y + h + 200) {
      this.music_s.stop();
      game.state.start('Dead');
      return;
    }
    if (this.player.x < 20)
      this.player.x = 20;
    else if (this.player.x > w - 20)
      this.player.x = w - 20;
    if (this.player.body.touching.down && this.player.scale.y == 1) {
      if (sound)
        this.jump_s.play('', 0, 0.15, false);
      if (this.player.scale.x == 1)
        var scale_x = 1.3;
      else
        var scale_x = -1.3;
      var tween = game.add.tween(this.player.scale).to({
          y: 0.7,
          x: scale_x
        }, 150, Phaser.Easing.Linear.None).start();
      tween.onComplete.add(function () {
        if (this.player.scale.x == 1)
          this.player.scale.setTo(1, 1);
        else
          this.player.scale.setTo(-1, 1);
        this.player.body.velocity.y = -(500 * 1.2);
      }, this);
    }
    this.player.body.velocity.x = 0;
    // var touch_right = game.input.activePointer.isDown && game.input.activePointer.x > w/2;
    // var touch_left = game.input.activePointer.isDown && game.input.activePointer.x < w/2;
    // if ((this.cursor.left.isDown || touch_left) && this.player.alive) {
    if (this.cursor.left.isDown && this.player.alive) {
      this.player.frame = 0;
      this.player.body.velocity.x = -300;
      if (this.player.scale.x == 1)
        this.player.scale.setTo(-1, 1);
    }  // else if ((this.cursor.right.isDown || touch_right) && this.player.alive) {
    else if (this.cursor.right.isDown && this.player.alive) {
      this.player.frame = 0;
      this.player.body.velocity.x = 300;
      if (this.player.scale.x == -1)
        this.player.scale.setTo(1, 1);
    } else
      this.player.frame = 1;
    if (this.player.body.velocity.y > -200) {
      this.took_heart = false;
      this.took_food = false;
      this.emitter.on = false;
    }
    this.emitter.x = this.player.x;
    this.emitter.y = this.player.y - 15;
    // ACCELEROMETER
    // !this.game.device.desktop
    if (typeof this.o === 'object' && this.player.body) {
      var sway = Math.round(this.o.gamma * this.speedFactor.mobile * 100) / 100;
      if (sway != 0)
        this.player.body.velocity.x = sway;
    }
  },
  add_platform: function (y, x) {
    var platform = this.platforms.getFirstExists(false);
    // this.game.physics.enable(platform);
    if (platform) {
      // console.log('add_platform. platform:', platform);
      this.game.physics.enable(platform);
      x = typeof x !== 'undefined' ? x : rand(w - platform.width - 10) + platform.width / 2 + 5;
      platform.reset(x, y);
      platform.anchor.setTo(0.5, 0.5);
      platform.body.velocity.x = 0;
      return platform;
    } else
      console.log('plat');  // TODO: BUG #2
  },
  add_platform_double: function (y) {
    console.log('add_platform_double. y:', y);
    this.add_platform(y);
    this.add_platform(y);
  },
  add_platform_heart: function (y) {
    var p = this.add_platform(y);
    var heart = this.hearts.getFirstExists(false);
    console.log('add_platform_heart, heart:', heart);
    if (heart) {
      this.game.physics.enable(heart);
      heart.anchor.setTo(0.5, 0.5);
      heart.reset(p.x, y - 29);
    }
  },
  add_platform_food: function (y) {
    var p = this.add_platform(y);
    var food = this.foods.getFirstExists(false);
    if (food) {
      this.game.physics.enable(food);
      food.anchor.setTo(0.5, 0.5);
      food.reset(p.x, y - 30);
    }
  },
  add_platform_spike: function (y) {
    var p = this.add_platform(y);
    // this.add_spike(p.x, p.y+18); ///////////////////////// TODO: BUG #2
    this.add_spike(p.x, p.y + 20);
  },
  add_platform_moving: function (y) {
    var p = this.add_platform(y);
    if (rand(2) == 0)
      p.body.velocity.x = -120;
    else
      p.body.velocity.x = 120;
  },
  add_cloud: function (y) {
    var cloud = this.clouds.getFirstExists(false);
    if (cloud) {
      if (!cloud.body) {
        this.game.physics.enable(cloud);
      }
      cloud.reset(rand(w) - cloud.width, y);
      if (rand(2) == 1)
        cloud.body.velocity.x = 8;
      else
        cloud.body.velocity.x = -8;
    } else
      console.log('cloud gone');
  },
  add_spike: function (x, y) {
    var spike = this.spikes.getFirstExists(false);
    this.game.physics.enable(spike);
    if (spike) {
      spike.body.setSize(spike.width, spike.height, 0, 0);
      spike.anchor.setTo(0.5, 0.5);
      spike.reset(x, y);
    } else
      console.log('spike');
  },
  update_platform: function (p) {
    if (p.x + p.width / 2 >= w && p.body.velocity.x > 0)
      p.body.velocity.x = -120;
    else if (p.x - p.width / 2 <= 0 && p.body.velocity.x < 0)
      p.body.velocity.x = 120;
    if (p.y - p.height > this.game.camera.y + h)
      p.kill();
  },
  update_heart: function (h) {
    if (h.y - h.height > this.game.camera.y + h)
      h.kill();
  },
  update_food: function (h) {
    if (h.y - h.height > this.game.camera.y + h)
      h.kill();
  },
  update_spike: function (s) {
    if (s.y - s.height > this.game.camera.y + h)
      s.kill();
  },
  take_heart: function (player, heart) {
    console.log('take_heart');
    heart.kill();
    if (sound)
      this.heart_s.play('', 0, 0.2, false);
    // this.emitter.on = true;
    this.player.body.velocity.y = -1200;
    this.took_heart = true;
  },
  take_food: function (player, food) {
    console.log('take_food');
    food.kill();
    // if (sound) this.heart_s.play('', 0, 0.2, false);
    // this.emitter.on = true;
    this.player.body.velocity.y = -1200;
    this.took_food = true;
  },
  take_spike: function (player, spike) {
    if (!this.took_heart || !this.took_food) {
      if (sound)
        this.hit_s.play('', 0, 0.4, false);
      this.player.alive = false;  // this.player.body.velocity.y = - 300;
                                  // this.player.body.velocity.y += 12; // DON'T KILL ME, JUST SLOW ME DOWN....
    }
  },
  shutdown: function () {
    game.world.removeAll();
  }
};Game.Realm = function (game) {
};
Game.Realm.prototype = {
  create: function () {
    createTitle('Level ' + realm + ' Complete!');
    var txt = 'Congratulations! \nYou beat level ' + realm;
    this.title = game.add.text(30, 80, txt, {
      font: '20px Kemco',
      fill: '#fff'
    });
    this.btn_mainmenu = game.add.sprite(80, 380, 'btn_mainmenu');
    this.btn_mainmenu.scale.setTo(0.5, 0.5);
    this.btn_mainmenu.inputEnabled = true;
    this.btn_mainmenu.events.onInputUp.add(function (e) {
      realm++;
      game.state.start('Play');
    });  // this.cursor = this.game.input.keyboard.createCursorKeys();
  },
  update: function () {
  },
  shutdown: function () {
    game.world.removeAll();
  }
};Game.Dead = function (game) {
};
Game.Dead.prototype = {
  create: function () {
    var data = { score: score };
    function reqListener() {
      console.log(this.responseText);
    }
    var req = new XMLHttpRequest();
    req.onload = reqListener;
    req.open('post', '/plays', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(data));
    game.add.text(Math.floor(w / 2) + 0.5, 50, 'GAME OVER', {
      font: '40px kemco',
      fill: '#fff'
    }).anchor.setTo(0.5, 0.5);
    /*
	    game.add.text(Math.floor(w/2)+0.5, 130, 'your score: '+score+'\nbest score: '+best_score, { font: '30px Arial', fill: '#fff', align: 'center' })
			.anchor.setTo(0.5, 0.5);

		if (this.game.device.desktop)
			var txt = 'press the UP arrow key to restart';
		else
			var txt = 'tap anywhere to restart';

	    label = game.add.text(Math.floor(w/2)+0.5, 200, txt, { font: '25px Arial', fill: '#fff' });
		label.anchor.setTo(0.5, 0.5);
		game.add.tween(label).to({ angle:1 }, 300, Phaser.Easing.Linear.None)
    	.to({ angle:-1 }, 300, Phaser.Easing.Linear.None).loop().start();

	    label2 = game.add.text(Math.floor(w/2)+0.5, h+300, 'I\'m sure you can do better!', { font: '25px Arial', fill: '#fff' });
		label2.anchor.setTo(0.5, 0.5);

		player = this.game.add.sprite(w/2, h+h, 'player_zoom');
    	player.anchor.setTo(0.5, 1);

		game.add.tween(label2).to({ y: 300 }, 2000, Phaser.Easing.Bounce.Out).start();
		game.add.tween(player).to({ y: h}, 2000, Phaser.Easing.Bounce.Out).start();    	

		if (sound) game.add.audio('dead').play('', 0, 0.3, false);
    */
    // this.cursor = this.game.input.keyboard.createCursorKeys();
    // var header = document.getElementById('header');
    // header.style.display = 'block';
    this.playagain = game.add.text(20, 100, 'Play Again');
    this.playagain.inputEnabled = true;
    this.playagain.events.onInputUp.add(function (e) {
      game.state.start('Play');
    });
    this.menu = game.add.text(20, 160, 'Back to Game Menu');
    this.menu.inputEnabled = true;
    this.menu.events.onInputUp.add(function (e) {
      game.state.start('Menu');
    });
  },
  update: function () {
  },
  shutdown: function () {
    game.world.removeAll();
  }
};var game;
function bootGame() {
  var options = {
      name: 'Agents of MMEAT',
      width: w,
      height: h,
      parent: 'game-container',
      antialias: false
    };
  // w, h, Phaser.AUTO, 'game-container'
  game = new Phaser.Game(options);
  game.state.add('Boot', Game.Boot);
  game.state.add('Load', Game.Load);
  game.state.add('Menu', Game.Menu);
  game.state.add('HowToPlay', Game.HowToPlay);
  game.state.add('Share', Game.Share);
  game.state.add('Leaderboard', Game.Leaderboard);
  game.state.add('Menu', Game.Menu);
  game.state.add('PlayerSelect', Game.PlayerSelect);
  game.state.add('Play', Game.Play);
  game.state.add('Realm', Game.Realm);
  game.state.add('Dead', Game.Dead);
  game.state.start('Boot');
}
angular.module(ApplicationConfiguration.applicationModuleName).run([
  '$rootScope',
  '$location',
  'Authentication',
  function ($rootScope, $location, Authentication) {
    $rootScope.$on('$viewContentLoaded', function () {
      var body = document.getElementsByTagName('body')[0];
      if (angular.element(body).hasClass('play') && document.getElementById('game-container') != null) {
        if (Authentication.user) {
          bootGame();
        } else {
          $location.path('/signin');
        }
      }
    });
  }
]);