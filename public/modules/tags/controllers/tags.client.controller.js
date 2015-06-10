'use strict';

angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 1000);

// Tags controller
angular.module('tags').controller('TagsController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Tags',
	function($scope, $stateParams, $location, $http, Authentication, Tags) {
		$scope.authentication = Authentication;
    $scope.tags = [];
    var offset = 0,
        total = 0;

    $scope.init = function() {
      $http.get('/tags/total')
        .success(function(data, status){
          total = data.count;
          // console.log('total: ', total);
          $scope.load();
        }).error(function(data, status){
          console.log('ERROR: ', data, status);
        });
    };

		$scope.load = function() {
      // console.log('offset: ', offset);
      // console.log('$scope.tags.length', $scope.tags.length, 'total:', total);

      if ($scope.tags.length < total) {
        // var dups = [];
        $http.get('/tags/' + offset)
          .success(function(data, status){
            _.forEach(data, function(item) {
              if ($scope.tags.length <= total) {
                // $scope.tags.push(item);
                // console.log($scope.tags.length);
                // console.log(item.id);
                
                if (_.where($scope.tags, {id: item.id.toString()}).length === 0) {
                  $scope.tags.push(item);
                } else {
                  // console.log('duplicated found');
                }
                
              }
            });
          }).error(function(data, status){
            console.log(data, status);
          });
        offset = offset + 10;
      } else {
        // console.log('stop loading more tags');
      }
		};
    
    $scope.isAdmin = function() {
      var retval = false;
      if (Authentication.user !== null) {
        retval = _.contains(Authentication.user.roles, 'admin');
      }
      return retval;
    };
    
    $scope.toggle = function(id){
      console.log('toggle', id);
      var el = angular.element(document.querySelector('#tag-' + id));
      $http.post('/admin/toggle/' + id)
        .success(function(data, status){
          console.log('success', data, status);
          el.toggleClass('unapproved');
        }).error(function(data, status){
          console.log('success', data, status);
        });
    };

	}
]);