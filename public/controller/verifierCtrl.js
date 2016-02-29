patApp.controller('verifierController', ['$scope','DataFactory',function($scope,DataFactory) {
	$scope.Assertions = DataFactory.getAssertions();
	$scope.selectedAssertion;
	$scope.setAssertion = function(assertion){
		$scope.selectedAssertion = assertion;
	};
	$scope.getVerifyResult = function(){ 
		var content = DataFactory.getSpecification();
        $.ajax({
           url:'api/verification/verify_assertion',
           type:'POST',
           dataType:'json',
           data:{specStr: JSON.stringify(content), assertion: $scope.selectedAssertion},
           success:function(data){
                console.log(data);
              // $scope.$apply();
        //       VALID,
        // INVALID,
        // UNKNOWN,
        // WITHPROBABILITY,
        // WITHREWARDS
           }

        }).fail(function() {
            alert( "Verification error" );
        });
          
    }

}]);

