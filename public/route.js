// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var patApp = angular.module('patApp', ['ngRoute','ui.codemirror','ngSanitize']);

// configure our routes
patApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'model/editor.html',
            controller  : 'editorController',
            css:'view/css/editor.css'
        })

        // route for the about page
        .when('/verifier', {
            templateUrl : 'model/verifier.html',
            controller  : 'verifierController'
        })

        // route for the contact page
        .when('/simulator', {
            templateUrl : 'model/simulator.html',
            controller  : 'simulatorController'
        })
        .when('/graph',{
            templateUrl : 'model/graph.html',
            controller  : 'graphController'
        })
        .otherwise({
            redirectTo:'/'
        });
});