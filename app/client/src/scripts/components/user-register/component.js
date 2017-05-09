app.component('userRegister', {

	templateUrl: 'template.html',

	controller: ['$scope', '$user', function($scope, $user){
		this.canSubmit = () => this.name && this.password && this.password == this.confirmPassword;

		this.register = () => {
			if(!this.canSubmit()) return;
			$user
			.register(this)
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
