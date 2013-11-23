define(function(require, exports, module) {

  var usersEdit = module.exports = {

    /* --------------------------------------- */
    /* --( User: Create )-- */
    /* --------------------------------------- */

    url: '/edit/:id', // This will turn into /users/edit/:id

    // Data to retrieve before we set views
    resolve: {
      user: ['Restangular', '$stateParams',
        function(Restangular, $stateParams) {
          return Restangular.one('users', $stateParams.id).get();
        }
      ]
    },

    // View Configurations
    views: {

      /* --------------------------------------- */
      /* --( Page Actions )-- */
      /* --------------------------------------- */

      'pageActions': {
        template: '<div uni-page-actions="actionConfig"></div>',
        controller: ['$scope', function($scope) {

          // Define our Action objects
          $scope.actionConfig = [
            {id: 'edit', title: 'Save User', trigger: 'submitUserForm', icon: 'user'},
            {id: 'cancel', title: 'Cancel', route: '/users', icon: 'remove-sign'}
          ];

          // Setup listener for save submit
          $scope.submitUserForm = function() {
            $scope.$parent.$broadcast('submitUser');
          };

        }]
      },

      /* --------------------------------------- */
      /* --( Main Page Content )-- */
      /* --------------------------------------- */

      'pageContent': {
        templateUrl: 'app/users/templates/form.html',
        controller: ['$scope', 'Restangular', '$state', 'growl', 'user',
          function($scope, Restangular, $state, growl, user) {

            // Define Page Title
            $scope.$watchCollection('user', function () {
              $scope.$root.pageTitle = 'Edit - ' + (user.firstName || '') + ' ' + (user.lastName || '');
            });

            // Store our user on the scope
            $scope.user = user;

            // Listen for other views that want to save a user
            $scope.$on('submitUser', function() {
              $scope.saveUser();
            });

            // Save user handler
            $scope.saveUser = function() {
              growl.addInfoMessage('Saving ' + user.firstName + ' ' + user.lastName + '...');
              $scope.user.put().then(
                // Success
                function(user) {
                  growl.addSuccessMessage(user.firstName + ' ' + user.lastName + ' Saved!');
                },
                // Error
                function(err) {
                  growl.addErrorMessage('There was an error saving ' + user.firstName + ' ' + user.lastName + ' :(');
                }
              );
            };
          }
        ]
      }
    }
  };
});