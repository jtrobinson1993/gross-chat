app.component('userUi', {

	templateUrl: 'template.html',

	controller: ['$scope', '$user', function($scope, $user){
		this.isRegisterForm = false;
		this.isPopupOpen = false;
		this.currentUser = $user.current();

		this.isLoggedIn = () => $user.isLoggedIn();
		this.toggleRegister = () => this.isRegisterForm = !this.isRegisterForm;
		this.openPopup = () => this.isPopupOpen = true;
		this.closePopup = () => this.isPopupOpen = false;

		$scope.$on('user:logged-in', (event, user) => {
			this.currentUser = user;
			this.closePopup();
		});

		$scope.$on('user:logged-out', (event) => {
			this.currentUser = {};
			this.closePopup();
		});

	}]

});
