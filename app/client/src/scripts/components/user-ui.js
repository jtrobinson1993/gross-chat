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
