// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var patApp = angular.module('patApp', ['ngRoute','ui.codemirror','ngCookies']);

// configure our routes
patApp.config(function($routeProvider) {
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
});
