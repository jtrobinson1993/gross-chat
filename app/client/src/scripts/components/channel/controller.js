app.component('channel', {

  templateUrl: 'template.html',

  controller: ['$scope', '$http', 'socket', 'user', function($scope, $http, socket, user){
    this.messages = [];
    this.currentUser = user.current();
    this.channelName = 'general';

    socket.on('message', message => {
      this.messages.push(message);
    });

    $scope.$on('message', (event, message) => {
      message.timestamp = Date.now();
      message.user = this.currentUser || 'anonymous';
      message.channel = this.channelName || 'general';

      this.messages.push(message);
      socket.emit('message', message);
    });

    this.$onInit = function(){
      $http
      .get(`/channel/${this.channelName}`)
      .then(({data}) => this.messages = this.messages.concat(data));
    };

  }]

});
