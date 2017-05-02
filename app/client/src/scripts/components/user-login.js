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
			.login(this)
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
