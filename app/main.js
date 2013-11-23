// Include our config
require(['config'], function() {
  // Kickoff our app
  require( [
    'jquery',
    'angular',
    'app',
    'bootstrap'
  ], function($, angular, app) {
    'use strict';
    // Bootstrap this bitch
    angular.bootstrap(document, ['nodegigs']);
  });
});
