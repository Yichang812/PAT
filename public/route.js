// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var patApp = angular.module('patApp', ['ngRoute','ui.codemirror']);


// configure our routes
patApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'view/editor.html',
            controller  : 'editorController'
        })

        // route for the about page
        .when('/verifier', {
            templateUrl : 'view/verifier.html',
            controller  : 'verifierController'
        })

        // route for the contact page
        .when('/simulator', {
            templateUrl : 'view/simulator.html',
            controller  : 'simulatorController'
        })
        .when('/graph',{
            templateUrl : 'view/graph.html',
            controller  : 'graphController'
        })
        .otherwise({
            redirectTo:'/'
        });
});



//patApp.controller('editorController', ['$scope',function($scope) {
//    // The modes
//    $scope.modes = ['Scheme', 'XML', 'Javascript'];
//    $scope.mode = $scope.modes[0];
//
//
//    // The ui-codemirror option
//    $scope.cmOption = {
//        lineNumbers: true,
//        indentWithTabs: true,
//        onLoad : function(_cm){
//
//            // HACK to have the codemirror instance in the scope...
//            $scope.modeChanged = function(){
//                _cm.setOption("mode", $scope.mode.toLowerCase());
//            };
//        }
//    };
//
//
//
//    // Initial code content...
//    $scope.cmModel = ';; Scheme code in here.\n' +
//    '(define (double x)\n\t(* x x))\n\n\n' +
//    '<!-- XML code in here. -->\n' +
//    '<root>\n\t<foo>\n\t</foo>\n\t<bar/>\n</root>\n\n\n' +
//    '// Javascript code in here.\n' +
//    'function foo(msg) {\n\tvar r = Math.random();\n\treturn "" + r + " : " + msg;\n}';
//}]);
//

