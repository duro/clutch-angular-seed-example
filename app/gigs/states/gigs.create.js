define(function(require, exports, module) {

  var gigsCreate = module.exports = {

    /* --------------------------------------- */
    /* --( Gigs: Create )-- */
    /* --------------------------------------- */

    url: '/create', // This will turn into /gigs/create

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
            {id: 'create', title: 'Create Gig', trigger: 'submitGigForm', icon: 'laptop'},
            {id: 'cancel', title: 'Cancel', route: '/gigs', icon: 'remove-sign'}
          ];

          // Setup listener for save submit
          $scope.submitGigForm = function() {
            $scope.$parent.$broadcast('submitGig');
          };

        }]
      },

      /* --------------------------------------- */
      /* --( Main Page Content )-- */
      /* --------------------------------------- */

      'pageContent': {
        templateUrl: 'app/gigs/templates/form.html',
        controller: ['$scope', 'Restangular', '$state', 'growl',
          function($scope, Restangular, $state, growl) {

            // Define Page Title
            $scope.$root.pageTitle = 'Create New Gig';

            // TinyMCE Config
            $scope.tinyMCEConfig = {
              selector: 'textarea.tinymce',
              skin : 'lightgray',
              width: '80%',
              height: '250px',
              toolbar: 'undo redo | bold italic underline | bullist numlist | outdent indent',
              menubar: false
            };

            // Listen for other views that want to save a gig
            $scope.$on('submitGig', function() {
              $scope.saveGig();
            });

            // Save User Handler
            $scope.saveGig = function() {
              var gigs      = Restangular.all('gigs')
                , itemName  = $scope.gig.companyName + ' - ' + $scope.gig.jobTitle;

              growl.addInfoMessage('Saving ' + itemName + '...');
              gigs.post($scope.gig).then(
                // On Success
                function(gig) {
                  growl.addInfoMessage(itemName + ' Saved!');
                  $state.go('gigs.list');
                },
                // On Fail
                function() {
                  growl.addInfoMessage('There was an error saving ' + itemName + ' :(');
                }
              );
            };
          }
        ]
      }
    },
  };
});
