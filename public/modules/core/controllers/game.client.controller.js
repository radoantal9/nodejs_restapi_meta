'use strict';

angular.module('core').controller('GameController',	function($rootScope, $scope) {
  
  console.log('game controller...');
  
  
  
  if (user) {
    var cleanup = $rootScope.$on('$locationChangeStart', function(event, next, current){
      var message = 'Are you sure you want to leave the game?';
      if (!window.confirm(message)) {
        event.preventDefault();
      } else {
        cleanup();
      }
    });
  }
    
});