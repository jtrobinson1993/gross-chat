app.factory('$vote', ['$user', '$http', function($user, $http){

  function list(){
    return $http.get('/vote');
  }

  function create({title, options}){
    return $http.post('/vote', {title, options});
  }

  function select({vote, option}){
    return $http.post('/vote/select', {vote, option, user: $user.current()});
  }

  return {list, create, select};

}]);
