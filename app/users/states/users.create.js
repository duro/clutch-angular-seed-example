define(function(require, exports, module) {

  var usersCreate = module.exports = {

    /* --------------------------------------- */
    /* --( User: Create )-- */
    /* --------------------------------------- */

    url: '/create', // This will turn into /users/create

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
            {id: 'create', title: 'Create User', trigger: 'submitUserForm', icon: 'user'},
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
        controller: ['$scope', 'Restangular', '$state', 'growl',
          function($scope, Restangular, $state, growl) {

            // Define Page Title
            $scope.$root.pageTitle = 'Create New User';

            // Listen for other views that want to save a user
            $scope.$on('submitUser', function() {
              $scope.saveUser();
            });

            // Save User Handler
            $scope.saveUser = function() {
              var users = Restangular.all('users');
              growl.addInfoMessage('Saving ' + $scope.user.firstName + ' ' + $scope.user.lastName + '...');
              users.post($scope.user).then(
                // On Success
                function(user) {
                  growl.addInfoMessage($scope.user.firstName + ' ' + $scope.user.lastName + ' Saved!');
                  $state.go('users.list');
                },
                // On Fail
                function() {
                  growl.addInfoMessage('There was an error saving ' + $scope.user.firstName + ' ' + $scope.user.lastName + ' :(');
                }
              );
            };
          }
        ]
      }
    },
  };
});
