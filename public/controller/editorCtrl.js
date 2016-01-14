

patApp.controller('editorController',['$scope',function($scope) {
    // The modes
    $scope.modes = ['Scheme', 'csp', 'Javascript'];//syntax supported
    $scope.mode = $scope.modes[0];
    $scope.currentTab = 'Model_1';

    //initiate the first tab with sample content, ref: code mirror
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
            theme:'eclipse',
            mode:$scope.mode.toLowerCase()}
    }];


    $scope.tabCount = $scope.tabs.length;


    //check if a tab is active
    $scope.isActiveTab = function(tabTitle) {
        return tabTitle == $scope.currentTab;
    };
    //check if the content belong to active tab
    $scope.isThisContent = function(content){
        return content.title == $scope.currentTab;
    };
    //set the clicked tab to active tab
    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.title;
    };
    //add a tab

    $scope.addTab = function(title,content){
        $scope.tabCount ++;
        var newTitle = 'Model_' + $scope.tabCount; //default name: Model_n
        var newModel = ''; //default content
        //if the title of new tab is passed in
        if (title){
            newTitle = title;
            newModel = content;
        }
        //push a new tab object into tabs
        $scope.tabs.push(
            {
                title:newTitle,
                cmModel:newModel,
                cmOption:
                {
                    lineNumbers: true,
                    indentWithTabs: true,
                    theme:'eclipse',
                    mode:$scope.mode.toLowerCase()
                }
            }
        );
        //set the new-create tab to active
        $scope.currentTab = newTitle;
        if(!$scope.$$phase)$scope.$apply();

    };
    //close a tab
    $scope.closeTab = function(tab){
        var index = $scope.tabs.indexOf(tab);
        console.log(index);
        $scope.tabs.splice(index,1);
        $scope.tabCount--;
    };
    $scope.changeMode = function (content,mode) {
        content.cmOption.mode = mode.toLowerCase();
    };


    $scope.uploadFile = function(files){
        if(window.File && window.FileList && window.FileReader){

            for (var i = 0; i<files.length;i++) {
                var fileReader = new FileReader();
                $scope.tempName = files[i].name;
                fileReader.onload = function (e) {
                    $scope.tempContent = e.target.result;
                    $scope.addTab($scope.tempName,$scope.tempContent);
                    $scope.tempContent='';
                    $scope.tempName = '';
                };
                fileReader.readAsText(files[i]);
            }
            var path = files[0].val();
            console.log(path);

        }else{
             alert('File API is not supported');
            }
    }


}]);

