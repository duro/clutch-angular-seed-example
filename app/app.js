define(function(require, exports, module) {
  'use strict';

  // Load Dependencies
  var angular = require('angular')
    , _       = require('underscore');

  // Load Angular Modules
  require('templates');
  require('restangular');
  require('ui.utils');
  require('ui.router');
  require('angular-animate');
  require('angular-growl');
  require('unicorn/unicorn');
  require('users/users');
  require('gigs/gigs');

  // Define Application Module
  var app = module.exports.app = angular.module('nodegigs', [
    // Define dependencies
    'templates-app', 'restangular', 'ui.router', 'ngAnimate',
    'angular-growl', 'unicorn', 'nodegigs.users', 'nodegigs.gigs'
  ])

  // Configure Application
  .config(function ($urlRouterProvider, RestangularProvider, growlProvider) {
    // Set default route
    $urlRouterProvider.otherwise( '/login' );

    // Restangular Config
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({id: "_id"});

    // Growl Config
    growlProvider.globalTimeToLive(3000);
  })

  // Define globals on rootScope
  .run(function ($rootScope, $state, $stateParams) {

    // Mirror $state and $stateParams onto the rootScope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

  });

});
