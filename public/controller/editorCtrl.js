
patApp.controller('editorController',['$scope','$timeout','$sce','$interval','DataFactory','Example','AuthService',function($scope,$timeout,$sce,$interval,DataFactory,Example,AuthService) {
    // The modes
    $scope.modes = ['CSP','Scheme','Javascript'];//syntax supported
    $scope.mode = $scope.modes[0];
    $scope.currentTab = 'Model_1';
    $scope.isLogin = false;

    $scope.init = function(){
        $scope.isLogin = AuthService.isLogin();
    };
    

    //initiate the first tab with sample content, ref: code mirror
    $scope.tabs = DataFactory.getModels();


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
        $scope.saveModels();
    };

    $scope.closeTab = function(tab){
        var index = $scope.tabs.indexOf(tab);
        $scope.tabs.splice(index,1);
        $scope.tabCount--;
    };

    $scope.changeMode = function (content,mode) {
        content.cmOption.mode = mode.toLowerCase();
    };

    //$interval(saveModels,5000,100);
    $scope.saveModels = function(){
         DataFactory.addModel($scope.tabs);
    }

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
        $scope.addTab(example.title, example.content);
    }

    $scope.grammarResult = '';
    $scope.loginError = '';

    $scope.login = function(user){
        if(!AuthService.login(angular.copy(user))){
            $scope.loginError = $sce.trustAsHtml('Wrong email or password!');
        }
        $scope.isLogin = AuthService.isLogin();
    };
    $scope.logout = function(){
        AuthService.logout();
        $scope.isLogin = AuthService.isLogin();
    }
    $scope.checkGrammar = function(){
        var tab;
        for(var i = 0; i<$scope.tabs.length;i++){
            tab = $scope.tabs[i];
            if(tab.title == $scope.currentTab){
                
                var content = tab.cmModel;
                $.ajax({
                   url:'api/grammar/csp',
                   type:'POST',
                   dataType:'json',
                   data:{specStr: JSON.stringify(content)},
                   success:function(data){
                       $scope.grammarResult = $sce.trustAsHtml(data.result.replace(/\n/g,"<br>"));
                       $scope.$apply();
                   }

                }).error(function(httpObj, textStatus) { 
                    $scope.loginAlert = true;
                    $scope.$apply();
                    $timeout(function() {$scope.loginAlert=false;}, 5000);
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
                    $scope.loginAlert = true;
                    $scope.$apply();
                    $timeout(function() {$scope.loginAlert=false;}, 5000);
                });
            }
        }
    }
}]);

