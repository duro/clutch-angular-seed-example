define(function(require, exports, module) {

  var angular = require('angular');

  var uniUtils = module.exports = angular.module('unicorn.utils', [])
  /**
   * Directive: uni-model-onblur
   *
   * This directive will update the referenced model only
   * onBlur. This is useful for when you want a form field to
   * be validated only onBlur, and not onChange
   */
  .directive('uniModelOnblur', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elm, attr, ngModelCtrl) {
        if (attr.type === 'radio' || attr.type === 'checkbox') return;

        elm.unbind('input').unbind('keydown').unbind('change');
        elm.bind('blur', function() {
          scope.$apply(function() {
            ngModelCtrl.$setViewValue(elm.val());
          });
        });
      }
    };
  })

  /**
   * Directive: uni-submit
   *
   * This directive adds functionality to a form submit to mark
   * the form as 'attempted' if it has been submitted at least once.
   * This is very beneficial to hide validation or show other messages
   * only when the form has been submitted once.
   */
  .directive('uniSubmit', function($parse) {
    return {
      restrict: 'A',
      require: ['uniSubmit', '?form'],
      controller: ['$scope', function ($scope) {
        $scope.$attempted = false;

        this.setAttempted = function() {
          $scope.$attempted = true;
        };
      }],
      compile: function(cElement, cAttributes, transclude) {
        return {
          pre: function(scope, formElement, attributes, controllers) {

            var submitController  = controllers[0]
              , formController    = controllers[1];

            scope.$watch('$attempted', function(value) {
              formController.$attempted = value;
            });
          },
          post: function(scope, formElement, attributes, controllers) {

            var submitController = controllers[0];
            var formController = (controllers.length > 1) ?
            controllers[1] : null;

            var fn = $parse(attributes.uniSubmit);

            formElement.bind('submit', function () {
              submitController.setAttempted();
              if (!scope.$$phase) scope.$apply();

              if (!formController.$valid) return false;

              scope.$apply(function() {
                fn(scope, {$event:event});
              });
            });
          }
        };
      }
    };
  });

});
