app.factory('$topic', ['$user', '$http', function($user, $http){

  function list(){
    return $http.get('/topic');
  }

  function create({title, options}){
    return $http.post('/topic', {title, options});
  }

  function select({option, topic}){
    return $http.post(`/topic/${topic.id}/select`, {option, user: $user.current()});
  }

  return {list, create, select};

}]);
