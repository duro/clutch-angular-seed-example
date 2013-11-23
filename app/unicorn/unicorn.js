define(function(require, exports, module) {

  var angular = require('angular');

  require('./utils/utils');
  require('./main-nav/main-nav');
  require('./login/login');
  require('./page/page');
  require('./grid/grid');

  var unicorn = module.exports = angular.module('unicorn', [
    'unicorn.utils', 'unicorn.login', 'unicorn.page',
    'unicorn.mainNav', 'unicorn.grid'
  ]);

});
