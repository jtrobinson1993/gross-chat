app.factory('$vote', ['$user', '$http', function($user, $http){

  function list(){
    return $http.get('/vote');
  }

  function create({title, options}){
    return $http.post('/vote', {title, options});
  }

  function select({option, vote}){
    return $http.post(`/vote/${vote.id}/select`, {option, user: $user.current()});
  }

  return {list, create, select};

}]);
