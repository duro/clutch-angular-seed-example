define(function(require, exports, module) {

  var angular = require('angular')
    , $       = require('jquery');

  require('ui.router');

  // Module declaration
  var mainNav = module.exports = angular.module('unicorn.page', ['ui.router'])
  /**
   * Base UI-Router State for Pages
   */
  .config(function($stateProvider) {
    $stateProvider
      .state( 'page', {
        abstract: true,
        templateUrl: 'app/unicorn/page/templates/app_layout.html',
        controller: ['$scope', function($scope){
          $scope.$root.htmlClass = 'app-layout';
        }]
      });
  })
  /**
   * Directive: uni-page
   *
   * Responsible for wrapping an individual page of the
   * Unicorn admin
   */
  .directive('uniPage', function() {
    return {
      restrict: 'A',
      templateUrl: 'app/unicorn/page/templates/page_content.html'
    };
  })
  /**
   * Directive: uni-page-actions
   *
   * Responsible for the page acions that appear in the
   * page header (upper right)
   */
  .directive('uniPageActions', ['$compile', function($compile) {
    return {
      restrict: 'A',
      template: '<div class="btn-group"></div>',
      link: function(scope, iElement, attrs) {
        var btnGroup = iElement.find('.btn-group');

        scope.actions = scope.$eval(attrs.uniPageActions);

        function createActionElement(action) {
          var a = $('<a></a>')
                    .addClass('btn')
                    .attr('id', 'action_' + action.id);

          if (angular.isDefined(action.trigger)) {
            a.attr('ng-click', action.trigger + '()');
          }
          else if (angular.isDefined(action.route)) {
            a.attr('href', '#' + action.route);
          }

          if (angular.isDefined(action.icon)) {
            a.html('<i class="icon-' + action.icon + '"></i> ' + action.title);
          } else {
            a.text(action.title);
          }

          return $compile(a)(scope);
        }

        angular.forEach(scope.actions, function(action, i){
          btnGroup.append(createActionElement(action));
        });
      }
    };
  }]);
});