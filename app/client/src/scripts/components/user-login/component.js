app.component('userLogin', {

	templateUrl: 'template.html',

	controller: ['$scope', '$user', function($scope, $user){
		this.canSubmit = () => this.name && this.password;

		this.login = () => {
			if(!this.canSubmit()) return;
			$user
			.login(this)
			.success((data) => {
				$user.data(data);
				$scope.$emit($user.events.loggedIn, data.user);
			})
			.error((err) => {
				console.log(err);
			});
			this.name = this.password = '';
		};

	}]

});
