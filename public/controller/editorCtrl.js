
patApp.controller('editorController',['$scope','$timeout','$sce','$interval','$location','DataFactory','Example','AuthService',function($scope,$timeout,$sce,$interval,$location,DataFactory,Example,AuthService) {
    // The modes
    $scope.modes = ['CSP','Scheme','Javascript'];//syntax supported
    $scope.mode = $scope.modes[0];
    $scope.currentTab = 0;
    $scope.isLogin = false;
    $scope.btnDisabled = false;

    $scope.init= function(){
        AuthService.isLogin()
        .then(function(data){$scope.isLogin = data.data.islogin;});
    };

    //initiate the first tab with sample content, ref: code mirror
    $scope.tabs = DataFactory.getModels();
    $scope.tabCount = $scope.tabs.length;

    //check if the content belong to active tab
    $scope.isThisContent = function(index){
        return index == $scope.currentTab;
    };
    //set the clicked tab to active tab
    $scope.onClickTab = function (index) {
        $scope.currentTab = index;
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
        
        $scope.currentTab = $scope.tabCount-1;
        if(!$scope.$$phase)$scope.$apply();
        $scope.saveModels();
    };

    $scope.closeTab = function(tab){
        var index = $scope.tabs.indexOf(tab);
        $scope.tabs.splice(index,1);
        $scope.tabCount--;
    };

    //change syntax highlighting 
    $scope.changeMode = function (content,mode) {
        content.cmOption.mode = mode.toLowerCase();
    };

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
        AuthService.login(angular.copy(user))
        .then(function(){
                AuthService.isLogin()
                .then(function(data){$scope.isLogin = data.data.islogin;});
            },function(){
                $scope.loginError = $sce.trustAsHtml('Wrong email or password!');
            });
        
    };
    
    $scope.logout = function(){
        AuthService.isLogin()
        .then(function(data){$scope.isLogin = data.data.islogin;});
    }
   $scope.checkGrammar = function(){
        $scope.btnDisabled = true;
        var content = $scope.tabs[$scope.currentTab].cmModel;
        postToGrammar(content);
   }

   $scope.verification = function(){
        $scope.btnDisabled = true;
        $scope.error = false;
        var content = $scope.tabs[$scope.currentTab].cmModel;
        DataFactory.setSpecification(content);
        postToVerify(content);

   }

    function postToGrammar(content){
        $.ajax({
            url:'api/grammar/csp',
            type:'POST',
            dataType:'json',
            data:{specStr: JSON.stringify(content)},
            success:function(data){
                $scope.grammarResult = $sce.trustAsHtml(data.result.replace(/\n/g,"<br>"));
                $scope.btnDisabled = false;
                $scope.$apply();
               
            }
        }).error(function(httpObj, textStatus) { 
            $scope.loginAlert = true;
            $scope.btnDisabled = false;
            $scope.$apply();
            $timeout(function() {$scope.loginAlert=false;}, 5000);
        });
    };

    function postToVerify(content){
        $.ajax({
           url:'api/grammar/csp',
           type:'POST',
           dataType:'json',
           data:{specStr: JSON.stringify(content)},
           success:function(data){
                if(data.result!="Error in the model"){
                    $.ajax({
                        url:'api/verification/assertions',
                        type:'POST',
                        dataType:'json',
                        data:{specStr: JSON.stringify(content)},
                        success:function(data){
                            DataFactory.setAssertions(data.assertions); 
                            $location.path('/verifier');
                            $scope.$apply();
                        }
                    });
                }else{
                    $scope.grammarResult = $sce.trustAsHtml(data.result.replace(/\n/g,"<br>"));
                    alert("Grammar Error!");
                    $scope.btnDisabled = false;
                    $scope.$apply();
                }
                
           }

        }).error(function(httpObj, textStatus) { 
            $scope.loginAlert = true;
            $scope.btnDisabled = false;
            $scope.$apply();
            $timeout(function() {$scope.loginAlert=false;}, 5000);
        });
        
        
    };
    
}]);