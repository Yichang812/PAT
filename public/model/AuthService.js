patApp.service('AuthService',function($http,$cookies){

	this.login = function(data) {
		return $http({
			method:"post",
			url:"login",
			data:{
				username:data.email,
				password:data.password
			}
		}).then(function(){
			$cookies.put("isLogin","true");
		}, function(){
			$cookies.put("isLogin","false");
		});
	};
	this.logout = function(){
		$cookies.put("isLogin","false");
	};
	this.isLogin = function(){
		if($cookies.get("isLogin")===undefined) $cookies.put("isLogin","false");
		if($cookies.get("isLogin") ==="true") return true;
		else return false;
	};
});