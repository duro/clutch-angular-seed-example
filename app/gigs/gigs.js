define(function(require, exports, module) {

  var angular = require('angular');

  require('ui.router');
  require('ui.tinymce');

  var gigsModule = module.exports = angular.module('nodegigs.gigs', [
    'ui.router', 'ui.tinymce'
  ])

  .config(function($stateProvider) {
    $stateProvider
      .state('page.gigs', {
        url: '/gigs',
        abstract: true,
        template: '<div uni-page></div>'
      })
      .state('page.gigs.list', require('./states/gigs.list'))
      .state('page.gigs.create', require('./states/gigs.create'))
      .state('page.gigs.edit', require('./states/gigs.edit'));
  });

});
