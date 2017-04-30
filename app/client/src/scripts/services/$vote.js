app.factory('$vote', ['$user', '$http', function($user, $http){

  function list(){
    return $http.get('/vote/list');
  }

  function create({title, options}){
    return $http.post('/vote/create', {title, options});
  }

  function select({vote, option}){
    return $http.post('/vote/select', {vote, option, user: $user.current()});
  }

  return {list, create, select};

}]);
