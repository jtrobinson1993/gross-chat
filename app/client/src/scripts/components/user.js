// USER UI COMPONENT
app.component('userUi', {

	template: `
		<div class="user-info" ng:show="$ctrl.isLoggedIn()">{{$ctrl.currentUser.name}}</div>
		<user-login ng:show="!$ctrl.isLoggedIn()"></user-login>
		<user-register ng:show="!$ctrl.isLoggedIn()"></user-register>
	`.replace(/\t|\n/g,''),

	controller: ['$scope', '$user', function($scope, $user){

		this.currentUser = $user.current();

		this.isLoggedIn = () => $user.current() !== undefined;

		$scope.$on('user:logged-in', (event, user) => {
			this.currentUser = user;
		});

	}]

});

// USER LOGIN COMPONENT
app.component('userLogin', {

	template: `
		<h2 class="component-title">Log in</h2>
		<form class="user-login form" name="userLogin">
			<input class="form-input" type="text" placeholder="username" name="name" ng:model="$ctrl.name" required />
			<input class="form-input" type="password" placeholder="password" name="password" ng:model="$ctrl.password" required />
			<div class="form-button button important submit" ng:click="$ctrl.login()">Log in</div>
		</form>
	`.replace(/\t|\n/g,''),

	controller: ['$scope', '$user', function($scope, $user){

		this.login = () => {
			if(!this.name || !this.password) return;
			$user
			.login(this.name, this.password)
			.success((data) => {
				$user.data(data);
				$scope.$emit('user:logged-in', data.user);
			})
			.error((err) => {
				console.log(err);
			});
			this.name = this.password = '';
		};

	}]

});

// USER REGISTER COMPONENT
app.component('userRegister', {

	template: `
		<h2 class="component-title">Register</h2>
		<form class="user-register form" name="userRegister">
			<input class="form-input" type="text" placeholder="username" name="name" ng:model="$ctrl.name" required />
			<input class="form-input" type="password" placeholder="password" name="password" ng:model="$ctrl.password" required />
			<input class="form-input" type="password" placeholder="confirm password" name="confirmPassword" ng:model="$ctrl.confirmPassword" required />
			<div class="form-button button important submit" ng:click="$ctrl.register()">Register</div>
		</form>
	`.replace(/\t|\n/g,''),

	controller: ['$scope', '$user', function($scope, $user){

		this.register = () => {
			if(!this.name || !this.password || this.password != this.confirmPassword) return;
			$user
			.register(this.name, this.password)
			.success((data) => {
				$user.data(data);
				$scope.$emit('user:logged-in', data.user);
			})
			.error((err) => {
				console.log(err);
			});
			this.name = this.password = this.confirmPassword = '';
		};

	}]

});
