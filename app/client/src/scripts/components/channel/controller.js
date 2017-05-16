app.component('channel', {

  templateUrl: 'template.html',

  controller: ['$scope', '$http', 'socket', 'user', function($scope, $http, socket, user){
    this.messages = [];
    this.user = user.current();
    this.name = 'general';

    const push = message => {
      const lastMessage = this.messages[this.messages.length - 1];
      message.timestamp = new Date(message.timestamp);

      if(lastMessage && lastMessage.user === message.user &&
        message.timestamp - lastMessage.timestamp < 60000){
        lastMessage.contents.push(message.contents[0]);
        return;
      }

      this.messages.push(message);
    };

    socket.on('message', message => {
      push(message);
    });

    $scope.$on('message', (event, message) => {
      message.timestamp = Date.now();
      message.user = this.user ? this.user.name : 'anonymous';
      message.channel = this.name || 'general';

      push(message);
      socket.emit('message', message);
    });

    this.$onInit = function(){
      $http
      .get(`/channel/${this.name}`)
      .then(({data}) => data.forEach(push));
    };

  }]

});
