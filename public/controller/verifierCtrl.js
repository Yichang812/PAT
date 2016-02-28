patApp.controller('verifierController', ['$scope','DataFactory',function($scope,DataFactory) {
	$scope.Assertions = DataFactory.getAssertions();
	$scope.selectedAssertion;
	$scope.setAssertion = function(assertion){
		$scope.selectedAssertion = assertion;
	};
	$scope.getVerifyResult = function(){ 
		var content = DataFactory.getSpecification();
        $.ajax({
           url:'******************',
           type:'POST',
           dataType:'json',
           data:{specStr: JSON.stringify(content), assertion: $scope.selectedAssertion},
           success:function(data){
                console.log(data);
              // $scope.$apply();
           }

        }).fail(function() {
            alert( "Verification error" );
        });
          
    }

}]);

