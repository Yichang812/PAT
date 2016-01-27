

patApp.controller('editorController',['$scope',function($scope) {
    // The modes
    $scope.modes = ['CSP','Scheme','Javascript'];//syntax supported
    $scope.mode = $scope.modes[0];
    $scope.currentTab = 'Model_1';

    //initiate the first tab with sample content, ref: code mirror
    $scope.tabs = [{
        title: 'Model_1',
        cmModel:
        '//@@Dining Philosopher@@\n'+
        '////////////////The Model//////////////////\n'+
        '#define N 8;\n'+
        'Phil(i) = get.i.(i+1)%N -> get.i.i -> eat.i -> put.i.(i+1)%N -> put.i.i -> Phil(i);\n'+
        'Fork(x) = get.x.x -> put.x.x -> Fork(x) [] get.(x-1)%N.x -> put.(x-1)%N.x -> Fork(x);\n'+
        'College() = ||x:{0..N-1}@(Phil(x)||Fork(x));\n'+
        'Implementation() = College() \\ {get.0.0,get.0.1,put.0.0,put.0.1,eat.1,get.1.1,get.1.2,put.1.1,put.1.2,eat.2,get.2.2,get.2.3,put.2.2,put.2.3,eat.3,get.3.3,get.3.4,put.3.3,put.3.4,eat.4,get.4.4,get.4.5,put.4.4,put.4.5,eat.5,get.5.5,get.5.6,put.5.5,put.5.6,eat.6,get.6.6,get.6.7,put.6.6,put.6.7,eat.7,get.7.7,get.7.0,put.7.7,put.7.0};\n'+
        'Specification() = eat.0 -> Specification();\n',
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

    $scope.closeTab = function(tab){
        var index = $scope.tabs.indexOf(tab);
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
    };

    //for verification
    $scope.grammarResult = ' ';
    $scope.checkGrammar = function(){
        var tab;
        for(var i = 0; i<$scope.tabs.length;i++){
            tab = $scope.tabs[i];
            if(tab.title == $scope.currentTab){
                
                var content = tab.cmModel;
                console.log(JSON.stringify(content));
                $.ajax({
                   url:'api/grammar/csp',
                   type:'POST',
                   dataType:'json',
                   data:{specStr: JSON.stringify(content)},
                   success:function(data){
                       $scope.grammarResult = data.result.replace(/\n/g,"<br>");
                       console.log(data);
                       $scope.$apply();
                   }

                }).fail(function() {
                    alert( "Check grammar error" );
                });
            }
        }


    }
}]);

