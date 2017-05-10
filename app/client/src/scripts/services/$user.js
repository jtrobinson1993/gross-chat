app.factory('$user', ['$cookies', '$http', function($cookies, $http){

	const events = {
		loggedIn: 'user:logged-in',
		loggedOut: 'user:logged-out'
	};

	function current(user){
		if(user !== undefined) $cookies.putObject('user', user);
		else return $cookies.getObject('user');
	}

	function token(token){
		if(token !== undefined) $cookies.putObject('token', token);
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

	function isLoggedIn(){ return current() !== undefined; }

	function login({name, password}){
		return $http.post('/user/authenticate', {name, password});
	}

	function logout(){
		$cookies.putObject('user', undefined);
		$cookies.putObject('token', undefined);
	}

	function register({name, password}){
		return $http.post('/user/register', {name, password});
	}

	return {current, token, data, login, logout, isLoggedIn, register, events};

}]);
