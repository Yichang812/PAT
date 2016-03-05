
patApp.controller('editorController',['$scope','$timeout','DataFactory','Example',function($scope,$timeout,DataFactory,Example) {
    // The modes
    $scope.modes = ['CSP','Scheme','Javascript'];//syntax supported
    $scope.mode = $scope.modes[0];
    $scope.currentTab = 'Model_1';

    //initiate the first tab with sample content, ref: code mirror
    $scope.tabs = DataFactory.getModels();;


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
    $scope.saveModels = function(){
        for(var i = 0; i<$scope.tabs.length; i++){
            DataFactory.addModel($scope.tab[i]);
        }
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
        }else{
             alert('File API is not supported');
            }
    };
    $scope.getCSPExample = function(){
        var example = Example.getCSP();
        console.log(example);
        $scope.addTab(example.title, example.content);
    }

    $scope.grammarResult = '';
    $scope.user={};
    $scope.loginError = '';
    $scope.notLogin = true;

    $scope.login = function (user) {
        $scope.user = angular.copy(user);
        console.log($scope.user.email);
        $.ajax({
           url:'login',
           type:'POST',
           dataType:'json',
           data:{username: $scope.user.email,password:$scope.user.password},
           success:function(){
             $scope.notLogin = false;
             $scope.$apply();
             console.log("success");
           }
        }).error(function(httpObj, textStatus) {       
            $scope.loginError = 'Your email or password is incorrect!';
            $scope.$apply();
        });

    };
    $scope.checkGrammar = function(){
        var tab;
        for(var i = 0; i<$scope.tabs.length;i++){
            tab = $scope.tabs[i];
            if(tab.title == $scope.currentTab){
                
                var content = tab.cmModel;
                // console.log(JSON.stringify(content));
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

                }).error(function(httpObj, textStatus) {       
                    if(httpObj.status==401) {
                        console.log("here");
                        $scope.loginAlert = true;
                        $scope.$apply();
                        $timeout(function() {$scope.loginAlert=false;}, 5000);
                    }
                });
            }
        }

    };
    $scope.verification = function(){
        var tab;
        for(var i = 0; i<$scope.tabs.length;i++){
            tab = $scope.tabs[i];
            if(tab.title == $scope.currentTab){
                
                var content = tab.cmModel;
                DataFactory.setSpecification(content);
                $.ajax({
                   url:'api/verification/assertions',
                   type:'POST',
                   dataType:'json',
                   data:{specStr: JSON.stringify(content)},
                   success:function(data){
                       DataFactory.setAssertions(data.assertions);
                   }

                }).error(function(httpObj, textStatus) {       
                    if(httpObj.status==401) {
                        console.log("here");
                        $scope.loginAlert = true;
                        $scope.$apply();
                        $timeout(function() {$scope.loginAlert=false;}, 5000);
                    }
                });
            }
        }
    }
}]);

