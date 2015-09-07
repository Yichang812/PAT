

patApp.controller('editorController', ['$scope',function($scope) {
    // The modes
    $scope.modes = ['Scheme', 'XML', 'Javascript'];
    $scope.mode

    $scope.cmOption  = {
        lineNumbers: true,
        indentWithTabs: true,
        theme:'lesser-dark',
        onLoad : function(_cm){

            // HACK to have the codemirror instance in the scope...
            $scope.modeChanged = function(content){
                _cm.setOption("mode", content.mode.toLowerCase());
            };
        }
    };

    // Initial code content...
    //$scope.cmModel = ';; Scheme code in here.\n' +
    //'(define (double x)\n\t(* x x))\n\n\n' +
    //'<!-- XML code in here. -->\n' +
    //'<root>\n\t<foo>\n\t</foo>\n\t<bar/>\n</root>\n\n\n' +
    //'// Javascript code in here.\n' +
    //'function foo(msg) {\n\tvar r = Math.random();\n\treturn "" + r + " : " + msg;\n}';


    //functions for tabs

    $scope.tabs = [{
        title: 'Model_1',
        mode:$scope.modes[0],
        cmModel:
        ';; Scheme code in here.\n' +
        '(define (double x)\n\t(* x x))\n\n\n' +
        '<!-- XML code in here. -->\n' +
        '<root>\n\t<foo>\n\t</foo>\n\t<bar/>\n</root>\n\n\n' +
        '// Javascript code in here.\n' +
        'function foo(msg) {\n\tvar r = Math.random();\n\treturn "" + r + " : " + msg;\n}'
    }, {
        title: 'Model_2',
        mode:$scope.modes[0],
        cmModel:''
    }];


    $scope.tabCount = 2;

    $scope.currentTab = 'Model_1';

    $scope.isThisContent = function(content){
        console.log($scope.currentTab);
        return content.title == $scope.currentTab;
    };

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.title;
    };

    $scope.isActiveTab = function(tabTitle) {
        return tabTitle == $scope.currentTab;
    };
    $scope.addTab = function(){
        $scope.tabCount ++;
        console.log($scope.tabCount);
        var newTitle = 'Model_' + $scope.tabCount;
        $scope.tabs.push({title:newTitle,mode:$scope.modes[0],cmMode:''});
    };
    $scope.closeTab = function(tab){
        var index = $scope.tabs.indexOf(tab);
        $scope.tabs.splice(index,1);
    }
}]);

