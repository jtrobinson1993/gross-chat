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
