(function(angular, app) {
app.factory('authenticationInterceptor',['$q', function($q){
  return function(promise){
    return promise.then(function(response){
      return response;
    },function(response){
      if(response.status === 401){
        //unauthenticated error
      }
      if(response.status >= 500 && response.status <= 599){
        //General error
      }
      return $q.reject(response);
    });
  };
}]);
})(angular,app);
