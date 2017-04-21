// USER UI COMPONENT
app.component('userUi', {

	template: `
		<div class="component user-ui" ng:class="$ctrl.isLoggedIn() ? 'logged-in' : 'logged-out'">
			<div class="current-user">
				<div class="user-info" ng:show="$ctrl.isLoggedIn()" ng:click="$ctrl.openPopup()">Welcome, <strong>{{$ctrl.currentUser.name}}</strong></div>
				<div class="open-popup" ng:show="!$ctrl.isLoggedIn()" ng:click="$ctrl.openPopup()">Sign in / Register</div>
			</div>
			<div class="popup overlay" ng:class="{'open': $ctrl.isPopupOpen}">
				<div class="popup-box">
					<div class="close-popup close-button fa fa-close" ng:click="$ctrl.closePopup()"></div>
					<div class="popup-content" ng:show="!$ctrl.isLoggedIn()">
						<user-login ng:show="!$ctrl.isLoggedIn() && !$ctrl.isRegisterForm"></user-login>
						<user-register ng:show="!$ctrl.isLoggedIn() && $ctrl.isRegisterForm"></user-register>
						<div class="button unimportant" ng:show="!$ctrl.isLoggedIn()" ng:click="$ctrl.toggleRegister()">
							<span ng:show="$ctrl.isRegisterForm">
								Already have an account? Log in
							</span>
							<span ng:show="!$ctrl.isRegisterForm">
								Don't have an account? Register now
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	`.replace(/\t|\n/g,''),

	controller: ['$scope', '$user', function($scope, $user){
		this.isRegisterForm = false;
		this.isPopupOpen = false;
		this.currentUser = $user.current();

		this.isLoggedIn = () => $user.current() !== undefined;
		this.toggleRegister = () => this.isRegisterForm = !this.isRegisterForm;
		this.openPopup = () => this.isPopupOpen = true;
		this.closePopup = () => this.isPopupOpen = false;

		$scope.$on('user:logged-in', (event, user) => {
			this.currentUser = user;
			this.closePopup();
		});

	}]

});

// USER LOGIN COMPONENT
app.component('userLogin', {

	template: `
		<div class="component user-login">
		<h2 class="component-title title">Log in</h2>
			<form class="user-login-form form" name="userLogin">
				<input class="form-input" type="text" placeholder="username" name="name" ng:model="$ctrl.name" required />
				<input class="form-input" type="password" placeholder="password" name="password" ng:model="$ctrl.password" required />
				<div class="form-button button important submit" ng:class="{'disabled': !$ctrl.canSubmit()}" ng:click="$ctrl.login()">Log in</div>
			</form>
		</div>
	`.replace(/\t|\n/g,''),

	controller: ['$scope', '$user', function($scope, $user){
		this.canSubmit = () => this.name && this.password;

		this.login = () => {
			if(!this.canSubmit()) return;
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
		<div class="component user-register">
			<h2 class="component-title title">Register</h2>
			<form class="user-register form" name="userRegister">
				<input class="form-input" type="text" placeholder="username" name="name" ng:model="$ctrl.name" required />
				<input class="form-input" type="password" placeholder="password" name="password" ng:model="$ctrl.password" required />
				<input class="form-input" type="password" placeholder="confirm password" name="confirmPassword" ng:model="$ctrl.confirmPassword" required />
				<div class="form-button button important submit" ng:class="{'disabled': !$ctrl.canSubmit()}" ng:click="$ctrl.register()">Register</div>
			</form>
		</div>
	`.replace(/\t|\n/g,''),

	controller: ['$scope', '$user', function($scope, $user){
		this.canSubmit = () => this.name && this.password && this.password == this.confirmPassword;

		this.register = () => {
			if(!this.canSubmit()) return;
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
