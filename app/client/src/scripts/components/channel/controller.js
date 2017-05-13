app.component('channel', {

  templateUrl: 'template.html',

  controller: ['$scope', '$http', '$socket', '$user', function($scope, $http, $socket, $user){
    this.messages = [];

    $socket.$on('message', message => {
      this.messages.push(message);
    });

    $scope.$on('message', (event, message) => {
      this.messages.push(message);
      $socket.$emit('message', message);
    });

  }]

});
