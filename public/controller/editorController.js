

patApp.controller('editorController', ['$scope',function($scope) {
    // The modes
    $scope.modes = ['Scheme', 'XML', 'Javascript'];
    $scope.mode = $scope.modes[0];
    $scope.mode = $scope.modes[0];


    //functions for tabs

    $scope.tabs = [{
        title: 'Model_1',
        cmModel:
        ';; Scheme code in here.\n' +
        '(define (double x)\n\t(* x x))\n\n\n' +
        '<!-- XML code in here. -->\n' +
        '<root>\n\t<foo>\n\t</foo>\n\t<bar/>\n</root>\n\n\n' +
        '// Javascript code in here.\n' +
        'function foo(msg) {\n\tvar r = Math.random();\n\treturn "" + r + " : " + msg;\n}',
        cmOption:{
            lineNumbers: true,
            indentWithTabs: true,
            mode:$scope.mode.toLowerCase()}
    }, {
        title: 'Model_2',
        cmModel:'',
        cmOption:{
            lineNumbers: true,
            indentWithTabs: true,
            mode:$scope.mode.toLowerCase()}
    }];


    $scope.tabCount = 2;
    $scope.currentTab = 'Model_1';

    $scope.isThisContent = function(content){

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
        $scope.tabs.push({title:newTitle,cmMode:'',cmOption:{lineNumbers: true,indentWithTabs: true,mode:$scope.mode.toLowerCase()}});
    };
    $scope.closeTab = function(tab){
        var index = $scope.tabs.indexOf(tab);
        $scope.tabs.splice(index,1);
    };
    $scope.changeMode = function (content,mode) {
        content.cmOption.mode = mode.toLowerCase();
    }

}]);

