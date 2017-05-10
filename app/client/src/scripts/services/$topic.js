app.factory('$topic', ['$user', '$http', function($user, $http){

  const events = {
    added: 'topic:added',
    voteCast: 'topic:vote-cast',
    updateOptions: 'topic:update-options',
    voted: 'topic:voted'
  };

  function list(){
    return $http.get('/topic');
  }

  function create({title, options}){
    return $http.post('/topic', {title, options});
  }

  function select({option, topic}){
    return $http.post(`/topic/${topic.id}/select`, {option, user: $user.current()});
  }

  return {list, create, select, events};

}]);
