(function(angular, app) {
  "use strict";
  app.directive('eagerLoad',["$window", function($window){
    return function(scope,elem,attrs){
      var window = angular.element($window);
      var postList = angular.element(elem);
      window.on('scroll',function(){
        if(!postList){
          return;
        }

        if(scope.eagerLoadOnProgress || scope.reachedEnd){
          return;
        }

        if(!scope.eagerLoadAfterElement){
          scope.eagerLoadAfterElement = 0;
        }

        var childElem = postList.children().get(scope.eagerLoadAfterElement);
        if(!childElem){
          return;
        }

        var childBottom = childElem.getBoundingClientRect().bottom;

        if(window.innerHeight() > childBottom){
          scope.$apply(attrs.eagerLoad);
        }else{
          scope.$apply(attrs.aboveElement);
        }
      });
    };
  }]);
})(angular, app);
