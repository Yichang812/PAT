patApp.controller('verifierController', ['$scope','$sce','DataFactory',function($scope,$sce,DataFactory) {
	$scope.Assertions = DataFactory.getAssertions();
	$scope.selectedAssertion;
    $scope.selectedIndex;
    $scope.selectedBehavior = 0;
    $scope.selectedEngine = 0;
    $scope.verifyBtn = "Verify";
    $scope.verifyDisable = true;

    $scope.Behaviors = $scope.Assertions[0].behavior;
    $scope.Engines = $scope.Assertions[0].engine;
    

	$scope.setAssertion = function(assertion,index){
		$scope.selectedAssertion = assertion;
        $scope.selectedIndex = index;
        $scope.Behaviors = $scope.Assertions[index].behavior;
        $scope.Engines = $scope.Assertions[index].engine;
        $scope.verifyDisable = false;
	};

    $scope.backToHome = function(){
        DataFactory.clearSpecification();
        DataFactory.clearAssertions();
    };

    $scope.verResult = [];
    $scope.isValid = function(index){
        if($scope.verResult[index]==1){
            return true;
        }
        return false;
    }
    $scope.isInvalid = function(index){
        if($scope.verResult[index]==2){
            return true;
        }
        return false;
    }

    $scope.setVerResult = function(index, type){
        $scope.verResult[index] = type;
    }
	$scope.getVerifyResult = function(){ 
		var content = DataFactory.getSpecification();
        $scope.verifyBtn = "Verifing...";
        $scope.verifyDisable = true;
        $.ajax({
           url:'api/verification/verify_assertion',
           type:'POST',
           dataType:'json',
           data:{specStr: JSON.stringify(content), assertion: $scope.selectedAssertion, behavior: $scope.selectedBehavior, engine: $scope.selectedEngine},
           success:function(data){
                $scope.verificationResult = $sce.trustAsHtml(data.result.statistics.replace(/\n/g,"<br>"));
                $scope.setVerResult($scope.selectedIndex,(data.result.type+1));
                $scope.verifyBtn = "Verify";
                $scope.verifyDisable = false;
                $scope.$apply();
           }
        }).fail(function() {
            alert("Verification error" );
        });
          
    }

}]);

