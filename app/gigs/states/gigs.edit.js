define(function(require, exports, module) {

  var gigsEdit = module.exports = {

    /* --------------------------------------- */
    /* --( Gig: Edit )-- */
    /* --------------------------------------- */

    url: '/edit/:id', // This will turn into /gigs/edit/:id

    // Data to retrieve before we set views
    resolve: {
      gig: ['Restangular', '$stateParams',
        function(Restangular, $stateParams) {
          return Restangular.one('gigs', $stateParams.id).get();
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
            {id: 'edit', title: 'Save Gig', trigger: 'submitGigForm', icon: 'laptop'},
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
        controller: ['$scope', 'Restangular', '$state', 'growl', 'gig',
          function($scope, Restangular, $state, growl, gig) {

            // Define Page Title
            $scope.$watchCollection('gig', function () {
              $scope.$root.pageTitle = 'Edit - ' + (gig.company || '') + ((gig.company && gig.title) ? ' : ' : '') + (gig.title || '');
            });

            // TinyMCE Config
            $scope.tinyMCEConfig = {
              selector: 'textarea.tinymce',
              skin : 'lightgray',
              width: '80%',
              height: '250px',
              toolbar: 'undo redo | bold italic underline | bullist numlist | outdent indent',
              menubar: false
            };

            // Store our gig on the scope
            $scope.gig = gig;

            // Listen for other views that want to save a gig
            $scope.$on('submitGig', function() {
              $scope.saveGig();
            });

            // Save gig handler
            $scope.saveGig = function() {
              var itemName  = $scope.gig.company + ' - ' + $scope.gig.title;
              growl.addInfoMessage('Saving ' + itemName + '...');
              $scope.gig.put().then(
                // Success
                function(gig) {
                  growl.addInfoMessage(itemName + ' Saved!');
                },
                // Error
                function(err) {
                  growl.addInfoMessage('There was an error saving ' + itemName + ' :(');
                }
              );
            };
          }
        ]
      }
    }
  };
});