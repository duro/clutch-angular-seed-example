define(function(require, exports, module) {

  var gigsList = module.exports = {

    /* --------------------------------------- */
    /* --( Users: Gigs )-- */
    /* --------------------------------------- */

    url: '', // This will be the top-level route /gigs

    // Data to retrieve before we set views
    resolve: {
      users: ['Restangular', function(Restangular) {
        return Restangular.all('gigs').getList();
      }]
    },

    // View Configurations
    views: {

      /* --------------------------------------- */
      /* --( Page Actions )-- */
      /* --------------------------------------- */

      'pageActions': {
        template: '<div uni-page-actions="actionConfig"></div>',
        controller: ['$scope', function($scope) {
          $scope.actionConfig = [
            {id: 'create', title: 'Create New Gig', route: '/gigs/create', icon: 'briefcase'}
          ];
        }]
      },

      /* --------------------------------------- */
      /* --( Main Page Content )-- */
      /* --------------------------------------- */

      'pageContent': {
        templateUrl: 'app/gigs/templates/list.html',
        controller: [
          '$scope', 'users',
          function($scope, gigs){

            // Define Page Title
            $scope.$root.pageTitle = 'Gigs';
            // Store our users
            $scope.gigs = gigs;

            /* --------------------------------------- */
            /* --( Unicorn Grid Setup )-- */
            /* --------------------------------------- */

            $scope.gridConfig = {
              data: gigs,
              colDef: [
                {field:'title', displayName:'Job Title', colClass: 'title'},
                {field:'company', displayName:'Company', colClass: 'company'},
                {
                  displayName: 'Actions',
                  sortable: false,
                  colClass: 'actions',
                  cellTemplateUrl: 'app/gigs/templates/list.actions.html'
                }
              ]
            };

          }
        ]
      }
    }
  };

});
