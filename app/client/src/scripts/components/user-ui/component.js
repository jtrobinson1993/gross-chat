app.component('userUi', {

	templateUrl: 'template.html',

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
