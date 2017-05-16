app.component('messageInput', {

  templateUrl: 'template.html',

  controller: ['$scope', function($scope){
    this.message = {contents: ['']};

    this.clear = () => this.message.contents = [''];

    this.submit = () => {
      if(!this.message.contents[0].trim()) return;

      $scope.$emit('message', angular.copy(this.message));
      this.clear();
    };

  }]

});
