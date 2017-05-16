app.component('message', {

  templateUrl: 'template.html',

  bindings: {
    message: '<'
  },

  controller: ['user', function(user){
    this.user = user.current();
  }]

});
