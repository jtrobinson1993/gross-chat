angular
.module('App')
.component('userLogin', {

	template: `<div class="user-login form">
							<input class="user-login-name form-field" type="text" ng-model="$ctrl.name" placeholder="username"/>
							<input class="user-login-password form-field" type="password" ng-model="$ctrl.password" placeholder="password"/>
							<button class="user-login-submit form-submit" ng-click="$ctrl.login()" >Log in</button>
						</div>`.replace(/\t|\n/g,''),

	controller: ['$http', '$cookies', '$location', function($http, $cookies, $location) {
		this.name = '';
		this.password = '';

		this.login = () => {
			if(this.name && this.password)
				$http
				.post('/user/authenticate', {
					name: this.name,
					password: this.password
				})
				.success((data) => {
					$cookies.putObject('token', data.token);
					$cookies.putObject('user', data.user);
				})
				.error((err) => {
					console.log(err);
				});
		};

	}]

});

angular
.module('App')
.component('userRegister', {

	template: `<div class="user-register form">
							<input class="user-register-name form-field" type="text" ng-model="$ctrl.name" placeholder="username"/>
							<input class="user-register-password form-field" type="password" ng-model="$ctrl.password" placeholder="password"/>
							<input class="user-register-password-confirm form-field" type="password" ng-model="$ctrl.passwordConfirmation" placeholder="confirm password"/>
							<button class="user-register-submit form-submit" ng-click="$ctrl.register()" >Register</button>
						</div>`.replace(/\t|\n/g,''),

	controller: ['$http', '$cookies', '$location', function($http, $cookies, $location){
		this.name = '';
		this.password = '';
		this.passwordConfirmation = '';

		this.register = () => {
			if(this.name && this.password && this.password == this.passwordConfirmation)
				$http
				.post('/user/register', {
					name: this.name,
					password: this.password
				})
				.success((data) => {
					if(data.user) {
						$cookies.putObject('token', data.token);
						$cookies.putObject('user', data.user);
					} else console.log(data.msg);
				})
				.error((err) => {
					console.log(err);
				});
		};

	}]

});
