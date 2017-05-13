app.component('messageInput', {

  templateUrl: 'template.html',

  controller: ['$scope', function($scope){
    this.message = {content:''};

    this.submit = () => {
      if(!this.message.content.trim()) return;

      $scope.$emit('message', angular.copy(this.message));
    };

  }]

});
