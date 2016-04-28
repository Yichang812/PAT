// create the module and name it patApp
// add dependencies to it
var patApp = angular.module('patApp', ['ngRoute','ui.codemirror','ngCookies']);

// configure our routes
patApp.config(function($routeProvider,$locationProvider) {
    $routeProvider

        // route for the main view (editor)
        .when('/', {
            templateUrl : 'view/editor.html',
            controller  : 'editorController',
            css:'view/css/editor.css'
        })

        // route for the verification view
        .when('/verifier', {
            templateUrl : 'view/verifier.html',
            controller  : 'verifierController'
        })

        // route for the simulation view
        .when('/simulator', {
            templateUrl : 'view/simulator.html',
            controller  : 'simulatorController'
        })
        
        .otherwise({
            redirectTo:'/'
        });

        //use the HTML5 History API
        $locationProvider.html5Mode(true);
});
