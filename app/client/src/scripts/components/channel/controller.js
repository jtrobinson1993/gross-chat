app.component('channel', {

  templateUrl: 'template.html',

  controller: ['$scope', '$http', 'socket', 'user', function($scope, $http, socket, user){
    this.messages = [];
    this.user = user.current();
    this.name = 'general';

    socket.on('message', message => {
      this.messages.push(message);
    });

    $scope.$on('message', (event, message) => {
      message.timestamp = Date.now();
      message.user = this.user ? this.user.name : 'anonymous';
      message.channel = this.name || 'general';

      this.messages.push(message);
      socket.emit('message', message);
    });

    this.$onInit = function(){
      $http
      .get(`/channel/${this.name}`)
      .then(({data}) => this.messages = this.messages.concat(data));
    };

  }]

});
