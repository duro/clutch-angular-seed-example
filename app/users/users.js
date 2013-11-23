define(function(require, exports, module) {

  // Load Dependencies
  var angular = require('angular');

  // Load Other Angular Modules
  require('ui.router');
  require('ui.utils');
  require('restangular');
  require('unicorn/grid/grid');
  require('unicorn/page/page');
  require('unicorn/utils/utils');

  // Declare Module
  var users = module.exports = angular.module('nodegigs.users', [
    'ui.router', 'ui.utils', 'restangular', 'unicorn.grid',
    'unicorn.page', 'unicorn.utils', 'angular-growl'
  ])

  /**
   * Define User Module States
   */
  .config(function($stateProvider) {
    $stateProvider
      /**
       * User: Abstract
       */
      .state( 'page.users', {
        url: '/users',
        abstract: true,
        template: '<div uni-page></div>'
      })
      /**
       * User: List View
       */
      .state('page.users.list', require('./states/users.list'))
      /**
       * User: Create View
       */
      .state('page.users.create', require('./states/users.create'))
      /**
       * User: Edit View
       */
      .state('page.users.edit', require('./states/users.edit'));
  });

});
