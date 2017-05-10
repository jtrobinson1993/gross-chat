app.component('userLogout', {

  templateUrl: 'template.html',

  controller: ['$scope', '$user', function($scope, $user){
    this.currentUser = $user.current();

    this.logout = () => {
      $user.logout();
      $scope.$emit($user.events.loggedOut);
    }

  }]

});
