patApp.controller('verifierController', ['$scope','DataFactory',function($scope,DataFactory) {
	$scope.Assertions = DataFactory.getAssertions();
	$scope.selectedAssertion;
    $scope.selectedIndex;
	$scope.setAssertion = function(assertion,index){
		$scope.selectedAssertion = assertion;
        $scope.selectedIndex = index;
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
        $.ajax({
           url:'api/verification/verify_assertion',
           type:'POST',
           dataType:'json',
           data:{specStr: JSON.stringify(content), assertion: $scope.selectedAssertion},
           success:function(data){
                console.log(data);
                $scope.verificationResult = data.result.statistics.replace(/\n/g,"<br>");
                
                $scope.setVerResult($scope.selectedIndex,(data.result.type+1));
                $scope.$apply();
           }

        }).fail(function() {
            alert( "Verification error" );
        });
          
    }

}]);

