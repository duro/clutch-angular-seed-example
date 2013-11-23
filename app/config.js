require.config({
  paths: {
    'almond'              : '../vendor/almond/almond',
    'angular'             : '../vendor/angular/angular',
    'jquery'              : '../vendor/jquery/jquery',
    'tinymce'             : '../vendor/tinymce/tinymce',
    'ui.router'           : '../vendor/angular-ui-router/release/angular-ui-router',
    'ui.utils'            : '../vendor/angular-ui-utils/components/angular-ui-docs/build/ui-utils',
    'ui.tinymce'          : '../vendor/angular-ui-tinymce/src/tinymce',
    'angular-mocks'       : '../vendor/angular-mocks/angular-mocks',
    'angular-growl'       : '../vendor/angular-growl/build/angular-growl',
    'angular-animate'     : '../vendor/angular-animate/angular-animate',
    'underscore'          : '../vendor/lodash/dist/lodash.underscore',
    'restangular'         : '../vendor/restangular/dist/restangular',
    'bootstrap'           : '../vendor/bootstrap-sass/dist/js/bootstrap'
  },
  baseUrl: 'app',
  shim: {
    'jquery'          : {exports  : 'jQuery'},
    'angular'         : {exports  : 'angular', deps : ['jquery']},
    'restangular'     : ['angular', 'underscore'],
    'bootstrap'       : ['jquery'],
    'angular-mocks'   : ['angular'],
    'angular-animate' : ['angular'],
    'angular-growl'   : ['angular', 'angular-animate'],
    'ui.tinymce'      : ['tinymce', 'angular'],
    'ui.utils'        : ['angular'],
    'ui.router'       : ['angular']
  },
  priority: [
    "angular"
  ]
});
