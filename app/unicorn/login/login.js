define(function(require, exports, module) {

  var angular = require('angular');

  require('ui.router');

  var loginModule = module.exports = angular.module('unicorn.login', ['ui.router'])
  /**
   * Module Config: Login
   */
  .config(function($stateProvider) {
    // Define UI-Router States
    $stateProvider
      .state( 'login', {
        url: '/login',
        templateUrl: 'app/unicorn/login/templates/login.html',
        controller: ['$scope', '$state', function($scope, $state) {
          // Set <html> element class
          $scope.$root.htmlClass = 'login-layout';
          // Set Page Title
          $scope.$root.pageTitle = 'Login';
          // Stub out a login method
          $scope.login = function(event) {
            event.preventDefault();
            event.stopPropagation();
            $state.go('page.users.list');
          };
        }]
      });
  });

});
