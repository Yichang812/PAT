patApp.service('AuthService',function($http,$cookies){

	this.login = function(data) {
		return $http({
			method:'post',
			url:'login',
			data:{
				username:data.email,
				password:data.password
			}
		})
	};
	
	this.isLogin = function(){
		return $http({
			method:'get',
			url:'islogin'
		})
	};
});