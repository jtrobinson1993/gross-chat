app.factory('$user', ['$cookies', '$http', function($cookies, $http){

	function current(user){
		if(user) $cookies.putObject('user', user);
		else return $cookies.getObject('user');
	}

	function token(token){
		if(token) $cookies.putObject('token', token);
		else return $cookies.getObject('token');
	}

	function data(data){
		if(data){
			current(data.user);
			token(data.token);
		} else {
			return {
				user: data.user,
				token: data.token
			}
		}
	}

	function login({name, password}){
		return $http.post('/user/authenticate', {name, password});
	}

	function register({name, password}){
		return $http.post('/user/register', {name, password});
	}

	return {current, token, data, login, register};

}]);
