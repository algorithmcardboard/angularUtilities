(function(angular, app) {
  "use strict";
  app.filter('fromNow',function(){
    return function(dateString){
      var date = Date.fromISO(dateString);
      return moment(date).fromNow();
    };
  });
})(angular, app);
